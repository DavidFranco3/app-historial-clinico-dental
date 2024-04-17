import { API_HOST } from "../utils/constants";
import {
    ENDPOINTRegistrarHistoriaClinica,
    ENDPOINTObtenerHistoriaClinica,
    ENDPOINTListarHistoriaClinica,
    ENDPOINTActualizarHistoriaClinica,
    ENDPOINTEliminarHistoriaClinica,
    ENDPOINTDeshabilitarHistoriaClinica
} from "./endpoints";
import axios from 'axios';

export async function listarHistoriaClinica(){
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
           
        }
    };
    return await axios.get(API_HOST + ENDPOINTListarHistoriaClinica, config);
}

export async function registraHistoriaClinica(data) {
    //console.log(data)

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.post(API_HOST + ENDPOINTRegistrarHistoriaClinica, data, config);
}

// Para obtener todos los datos del usuario
export async function obtenerHistoriaClinica(params) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };
    return await axios.get(API_HOST + ENDPOINTObtenerHistoriaClinica + `/${params}`, config);
}

export async function actualizarHistoriaClinica(id, data) {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.put(API_HOST + ENDPOINTActualizarHistoriaClinica + `/${id}`, data, config);
}

export async function eliminarHistoriaClinica(id, data) {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.delete(API_HOST + ENDPOINTEliminarHistoriaClinica + `/${id}`, data, config);
}

export async function actualizaDeshabilitarHistoriaClinica(id, data) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return await axios.put(API_HOST + ENDPOINTDeshabilitarHistoriaClinica + `/${id}`, data, config);
}