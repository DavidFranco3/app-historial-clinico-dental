import { useState } from "react";
import "./style.css";
import logo from "../../assets/img/herfransinfondo.png";
import { Form, Image, Button, Modal } from "react-bootstrap";
import jwtDecode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { setTokenApi, login } from "../../api/auth";
import { isEmailValid } from "../../utils/validations";
import { registraUsuarios2 } from "../../api/usuarios";
import { useNavigate } from "react-router-dom";
import { SwiperPag } from "../principal/Swiper";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const Registro = ({ setShow }) => {

    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");

    const passComp1 = (event) => {
        setPass1(event.target.value);
    };
    const passComp2 = (event) => {
        setPass2(event.target.value);
    };

    const verificarPass = () => {
        if (passComp1 !== passComp2) {
            toast.warning("Las contraseñas no coinciden");
        }
    };

    const [formData, setFormData] = useState(initialFormValue);
    const [signInLoading, setSignInLoading] = useState(false);

    const [mostrarPassword, setMostrarPassword] = useState(false);
    const togglePasswordVisiblity = () => {
        setMostrarPassword((val) => !val);
    };

    const enrutamiento = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!formData.nombre || !formData.apellidos || !formData.email || !formData.password1 || !formData.password2 || !formData.tipo) {
            toast.warning("Completa todos los campos del formulario.");
        } else {
            if (!isEmailValid(formData.email)) {
                toast.warning("Correo no valido");
            } else {
                if (formData.password1 !== formData.password2) {
                    toast.warning("Las contraseñas no coinciden");
                } else {
                    setSignInLoading(true);
                    try {
                        const dataTemp = {
                            nombre: formData.nombre + " " + formData.apellidos,
                            email: formData.email,
                            password: formData.password1,
                            tipo: formData.tipo,
                            estado: "true"
                        };
                        registraUsuarios2(dataTemp).then((response) => {
                            const { data } = response;
                            console.log(data)

                            toast.success(data.mensaje);

                            setSignInLoading(false);
                            setShow(false);
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
                }
            }
        }
    };

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="containerInicio">
            <Form onChange={onChange} onSubmit={onSubmit}>
                <Form.Group className="datosPersonalesReg">
                    <Form.Label>Nombre (s): </Form.Label>
                    <Form.Control
                        type="text"
                        className="nomNewUser"
                        placeholder="Nombre (s)"
                        name="nombre"
                        defaultValue={formData.nombre}
                    />
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control
                        type="text"
                        className="apsNewUser"
                        placeholder="Apellidos"
                        name="apellidos"
                        defaultValue={formData.apellidos}
                    />
                </Form.Group>
                <Form.Group className="datosAcceso">
                    <Form.Label>Correo electrónico: </Form.Label>
                    <Form.Control
                        type="email"
                        className="emailNewUser"
                        placeholder="ejemplo@ejemplo.com"
                        name="email"
                        defaultValue={formData.email}
                    />
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        className="passNewUser"
                        placeholder="Ingrese una contraseña"
                        name="password1"
                        defaultValue={formData.password1}
                    />
                    <Form.Label>Confirmar contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        className="passConfirmNewUser"
                        placeholder="Confirme contraseña"
                        name="password2"
                        defaultValue={formData.password2}
                    />
                    <Form.Label>Tipo</Form.Label>
                    <Form.Control
                        as="select"
                        className="passConfirmNewUser"
                        placeholder="Tipo"
                        name="tipo"
                        defaultValue={formData.tipo}
                    >
                        <option value="">Selecciona una opcion</option>
                        <option value="doctor">Doctor</option>
                        <option value="consultorio">Consultorio</option>
                    </Form.Control>
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

function initialFormValue() {
    return {
        nombre: "",
        apellidos: "",
        email: "",
        password1: "",
        password2: "",
        tipo: ""
    };
}
