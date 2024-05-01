import { useState } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";

export default function RegistroProcedimiento({ setShowModal, anadirProcedimiento }) {
    const [fecha, setFecha] = useState('');
    const [tratamiento, setTratamiento] = useState('');
    const [tiempo, setTiempo] = useState('');
    const [responsable, setResponsable] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        try {
            const nuevoProcedimiento = {
                fecha,
                tratamiento,
                tiempo,
                responsable
            };

            anadirProcedimiento(nuevoProcedimiento);  // Llama a la función pasada por props para agregar el procedimiento
            toast.success("Procedimiento añadido exitosamente");
            setShowModal(false); // Cierra el modal después de añadir el procedimiento
        } catch (ex) {
            toast.error("Error al procesar los datos");
        }
    };

    return (
        <div className="containerInicio">
            <Form onSubmit={onSubmit}>
                <Form.Group className="datosPersonalesReg">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control
                        type="date"
                        className="date"
                        name="fecha"
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                    />
                    <Form.Label>Tratamiento: </Form.Label>
                    <Form.Control
                        type="text"
                        className="apsNewUser"
                        placeholder="Tratamiento"
                        name="tratamiento"
                        value={tratamiento}
                        onChange={e => setTratamiento(e.target.value)}
                    />
                    <Form.Label>Tiempo: </Form.Label>
                    <Form.Control
                        type="text"
                        className="apsNewUser"
                        placeholder="Tiempo"
                        name="tiempo"
                        value={tiempo}
                        onChange={e => setTiempo(e.target.value)}
                    />
                    <Form.Label>Responsable: </Form.Label>
                    <Form.Control
                        type="text"
                        className="apsNewUser"
                        placeholder="Responsable"
                        name="responsable"
                        value={responsable}
                        onChange={e => setResponsable(e.target.value)}
                    />
                </Form.Group>
                <br />
                <div className="divSubmit">
                    <input className="submit" value="Añadir y Cerrar" type="submit" />
                </div>
            </Form>
        </div>
    );
}