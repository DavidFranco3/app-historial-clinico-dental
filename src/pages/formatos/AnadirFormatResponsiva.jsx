import { useEffect, useState } from "react";
import { actualizarHistoriaClinica, obtenerHistoriaClinica } from "../../api/historiaClinica";
import { toast } from "react-toastify";
import queryString from "query-string";
import { Form, Col, Row } from "react-bootstrap";
import { subeArchivosCloudinary } from "../../api/cloudinary";

export default function AnadirResponsiva({data, history, setShowModal}) {
    const { id, nombre } = data;

    const [formData, setFormData] = useState({});
    const [cartaResponsivaArchivo, setCartaResponsivaArchivo] = useState();

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const response = await obtenerHistoriaClinica(id);
                console.log("datos cargados: ", response.data);
                setFormData(response.data || {});
                setCartaResponsivaArchivo(response.data.cartaResponsiva);
            } catch (error) {
                console.error('Error al cargar los datos del paciente');
            };
        };

        cargarDatos();
    }, [id]);

    console.log(formData);

    const [signInLoading, setSignInLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Asumiendo que solo se sube un archivo
        if (file) {
            setFormData({ ...formData, cartaResponsiva: file });
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setSignInLoading(true);

        const uploads = [];

        if (formData.cartaResponsiva) {
            const uploadPromise = subeArchivosCloudinary(formData.cartaResponsiva, 'responsivas')
            .then(url => {
                formData.cartaResponsiva = url;
                return url;
            });
            uploads.push(uploadPromise);
        } else {
            toast.error("Por favor incluye un archivo");
            return;
        }

        await Promise.all(uploads)

        const dataTemp =  formData;

        try {
            actualizarHistoriaClinica(id, dataTemp).then((response) => {
                const { data } = response;
                console.log(data);

                toast.success(data.message);

                history({
                    search: queryString.stringify(""),
                });
                setSignInLoading(false);
                setShowModal(false);
            }).catch((ex) => {
                if (ex.response && ex.response.status === 401) {
                    const { mensaje } = ex.response.data;
                    toast.error(mensaje);
                    setSignInLoading(false);
                }
            }) 
        } catch (error) {
            console.log(error);
        }
    }

    const onDelete = async (e) => {
        e.preventDefault();
        setSignInLoading(true); 

        formData.cartaResponsiva = "";

        const dataTemp = formData;
        
        try {
            actualizarHistoriaClinica(id, dataTemp).then((response) => {
                const { data } = response;
                console.log(data);

                toast.success(data.message);

                history({
                    search: queryString.stringify(""),
                });
                setSignInLoading(false);
                setShowModal(false);
            }).catch((ex) => {
                if (ex.response && ex.response.status === 401) {
                    const { mensaje } = ex.response.data;
                    toast.error(mensaje);
                    setSignInLoading(false);
                }
            }) 
        } catch (error) {
            
        }

    }

    return (
        <div className="container-fluid">
            <Form onSubmit={onSubmit} className="">
                <Row>
                    <Col>
                        <Form.Label>Nombre:</Form.Label>
                        <Form.Control
                            type="text"
                            className="nomNewUser"
                            placeHolder="Nombre (s)"
                            name="nombre"
                            value={nombre}
                            disabled={true}
                        />
                    </Col>
                {/* Renderiza el campo de archivo y el botón solo si cartaResponsiva es null o undefined */}
                {!cartaResponsivaArchivo ? (
                        <Col>
                            <Form.Label>Subir carta responsiva:</Form.Label>
                            <input
                                type="file"
                                className="form-control"
                                aria-label="file example"
                                required
                                onChange={handleFileChange}
                            />
                            <button className="mt-2" variant="secondary" type="submit">Subir archivo</button>
                        </Col>
                    ) : (
                        <Col className="d-flex flex-column">
                            <Form.Label>Carta Responsiva:</Form.Label>
                            <div className="d-flex justify-content-around">
                                <button
                                    className="btn btn-secondary mt-2"
                                    onClick={() => window.open(formData.cartaResponsiva, "_blank")}
                                >
                                    Descargar Carta Responsiva
                                </button>
                                <button
                                    className="btn btn-danger mt-2"
                                    onClick={onDelete}
                                >
                                    Eliminar carta responsiva
                                </button>
                            </div>
                        </Col>
                    )}
                </Row>
            </Form>
        </div>
    );
};