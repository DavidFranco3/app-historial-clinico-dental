
import { useState } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { eliminarHistoriaClinica } from "../../api/historiaClinica";
import queryString from "query-string";

export default function Eliminar({ data, history, setShowModal }) {
console.log(data);
    const { id, nombre, edad } = data;

    const [signInLoading, setSignInLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setSignInLoading(true);
        try {

            eliminarHistoriaClinica(id).then((response) => {
                const { data } = response;
                console.log(data)

                toast.success(data.mensaje);

                history({
                    search: queryString.stringify(""),
                });
                setSignInLoading(false);
                setShowModal(false);
                //cancelarRegistro()
            }).catch((ex) => {
                if (ex.message === "Network Error") {
                    toast.error("Conexión al servidor no disponible");
                    setSignInLoading(false);
                } else {
                    if (ex.response && ex.response.status === 401) {
                        const { mensaje } = ex.response.data;
                        toast.error(mensaje);
                        setSignInLoading(false);
                    }
                }
            });
        } catch (ex) {
            toast.error("Error al iniciar sesión");
            setSignInLoading(false);
        }
    };

    return (
        <div className="containerInicio">
            <Form onSubmit={onSubmit}>
                <Form.Group className="datosPersonalesReg">
                    <Form.Label>Nombre (s): </Form.Label>
                    <Form.Control
                        type="text"
                        className="nomNewUser"
                        placeholder="Nombre (s)"
                        name="nombre"
                        value={nombre}
                        disabled
                    />
                    <Form.Label>Apellidos: </Form.Label>
                    <Form.Control
                        type="text"
                        className="apsNewUser"
                        placeholder="Apellidos"
                        name="apellidos"
                        value={edad}
                        disabled
                    />
                </Form.Group>
                <br />
                <label></label>
                <div className="divSubmit">
                    <input className="submit" value="Enviar" type="submit" />
                </div>
            </Form>
        </div>
    );
};

