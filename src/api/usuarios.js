import { API_HOST } from "../utils/constants";
import {
    ENDPOINTRegistrarUsuario,
    ENDPOINTRegistrarUsuario2,
    ENDPOINTObtenerUsuarios,
    ENDPOINTListarUsuario,
    ENDPOINTActualizarUsuario,
    ENDPOINTEliminarUsuario,
    ENDPOINTDeshabilitarUsuario
} from "./endpoints";
import axios from 'axios';

export async function listarUsuarios(){
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
           
        }
    };
    return await axios.get(API_HOST + ENDPOINTListarUsuario, config);
}

export async function registraUsuarios(data) {
    //console.log(data)

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.post(API_HOST + ENDPOINTRegistrarUsuario, data, config);
}

export async function registraUsuarios2(data) {
    //console.log(data)

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.post(API_HOST + ENDPOINTRegistrarUsuario2, data, config);
}

// Para obtener todos los datos del usuario
export async function obtenerUsuario(params) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTObtenerUsuarios + `/${params}`, config);
}

export async function actualizarUsuario(id, data) {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.put(API_HOST + ENDPOINTActualizarUsuario + `/${id}`, data, config);
}

export async function eliminarUsuario(id, data) {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.delete(API_HOST + ENDPOINTEliminarUsuario + `/${id}`, data, config);
}

export async function actualizaDeshabilitarUsuario(id, data) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.put(API_HOST + ENDPOINTDeshabilitarUsuario + `/${id}`, data, config);
}