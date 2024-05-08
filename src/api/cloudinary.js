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
        return response.data.url; // Asumiendo que la URL está directamente en `data.url`
    } catch (error) {
        console.error("Error al subir la imagen a Cloudinary", error);
        return null; // Manejar errores de manera adecuada
    }
}