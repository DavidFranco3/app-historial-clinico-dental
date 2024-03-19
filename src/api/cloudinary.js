import { API_CLOUDINARY } from "../utils/constants";
import axios from "axios";

export async function subeArchivosCloudinary(imagen, carpeta, calidad = 65) {
    const data = new FormData();
    data.append("file", imagen);
    data.append("upload_preset", "cancun");
    data.append('public_id', `${carpeta}/${Date.now() + "_" + imagen.name}`);
    data.append('folder', `${carpeta}`);
    data.append("cloud_name", "omarlestrella");
    data.append("quality", calidad.toString()); // Agregar calidad como parámetro

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };

    return await axios.post(API_CLOUDINARY, data, config);
}
