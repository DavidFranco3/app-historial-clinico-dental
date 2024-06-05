import { API_CLOUDINARY } from "../utils/constants";
import axios from "axios";

export async function subeArchivosCloudinary(imagen, carpeta, calidad = 65) {
    console.log(`Subiendo imagen: ${imagen.name}, Carpeta: ${carpeta}, Calidad: ${calidad}`);

    const data = new FormData();
    data.append("file", imagen);
    data.append("upload_preset", "cancun");
    data.append('public_id', `${carpeta}/${Date.now()}_${imagen.name}`);
    data.append('folder', carpeta);
    data.append("cloud_name", "omarlestrella");
    data.append("quality", calidad.toString());

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };

    try {
        const response = await axios.post(API_CLOUDINARY, data, config);
        return response.data.secure_url; // Asumiendo que la URL está directamente en `data.url`
    } catch (error) {
        console.error("Error al subir la imagen a Cloudinary", error);
        return null; // Manejar errores de manera adecuada
    }
}

// Función para generar un hash SHA-1
function sha1(message) {
    function rotate_left(n, s) {
        return (n << s) | (n >>> (32 - s));
    }
    function cvt_hex(val) {
        let str = '';
        let i;
        let v;
        for (i = 7; i >= 0; i--) {
            v = (val >>> (i * 4)) & 0x0f;
            str += v.toString(16);
        }
        return str;
    }
    let blockstart;
    let i, j;
    let W = new Array(80);
    let H0 = 0x67452301;
    let H1 = 0xEFCDAB89;
    let H2 = 0x98BADCFE;
    let H3 = 0x10325476;
    let H4 = 0xC3D2E1F0;
    let A, B, C, D, E;
    let temp;
    message = encodeURIComponent(message);
    let msg_len = message.length;
    let word_array = [];
    for (i = 0; i < msg_len - 3; i += 4) {
        j = message.charCodeAt(i) << 24 | message.charCodeAt(i + 1) << 16 |
            message.charCodeAt(i + 2) << 8 | message.charCodeAt(i + 3);
        word_array.push(j);
    }
    switch (msg_len % 4) {
        case 0:
            i = 0x080000000;
            break;
        case 1:
            i = message.charCodeAt(msg_len - 1) << 24 | 0x0800000;
            break;
        case 2:
            i = message.charCodeAt(msg_len - 2) << 24 | message.charCodeAt(msg_len - 1) << 16 | 0x08000;
            break;
        case 3:
            i = message.charCodeAt(msg_len - 3) << 24 | message.charCodeAt(msg_len - 2) << 16 | message.charCodeAt(msg_len - 1) << 8 | 0x80;
            break;
    }
    word_array.push(i);
    while ((word_array.length % 16) != 14) word_array.push(0);
    word_array.push(msg_len >>> 29);
    word_array.push((msg_len << 3) & 0x0ffffffff);
    for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
        for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i];
        for (i = 16; i <= 79; i++) W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;
        for (i = 0; i <= 19; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }
        for (i = 20; i <= 39; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }
        for (i = 40; i <= 59; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }
        for (i = 60; i <= 79; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }
        H0 = (H0 + A) & 0x0ffffffff;
        H1 = (H1 + B) & 0x0ffffffff;
        H2 = (H2 + C) & 0x0ffffffff;
        H3 = (H3 + D) & 0x0ffffffff;
        H4 = (H4 + E) & 0x0ffffffff;
    }
    return (cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4)).toLowerCase();
}

const CLOUDINARY_API_KEY = "484442438112735";
const CLOUDINARY_API_SECRET = "XtzmVLIGOELbGKET5BA85Vkelj0";
const CLOUDINARY_CLOUD_NAME = "omarlestrella";

export async function eliminaArchivoCloudinary(publicId) {
    const timestamp = Math.floor(Date.now() / 1000); // Crear un timestamp actual
    const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
    const signature = sha1(stringToSign);

    const data = {
        public_id: publicId,
        api_key: CLOUDINARY_API_KEY,
        timestamp: timestamp,
        signature: signature
    };

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/destroy`, data, config);
        return response.data;
    } catch (error) {
        console.error("Error deleting from Cloudinary:", error);
        throw error;
    }
}
