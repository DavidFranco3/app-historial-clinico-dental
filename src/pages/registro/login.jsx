import { useState } from "react";
import { login, setTokenApi } from "../../api/auth";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { Spinner, Button, Form, Image, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { obtenerUsuario } from "../../api/usuarios";
import "./styleLogin.css";
import imagenLogin from "../../assets/img/rehabilitacionbucal.png";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons/faRightToBracket";

function Login({ setRefreshCheckLogin }) {
  const [formData, setFormData] = useState(initialFormValue);
  const [signInLoading, setSignInLoading] = useState(false);

  const [mostrarPassword, setMostrarPassword] = useState(false);
  const togglePasswordVisiblity = () => {
    setMostrarPassword((val) => !val);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!formData.password) {
      toast.warning("Completa todos los campos del formulario.");
    } else {
      setSignInLoading(true);
      try {
        login(formData)
          .then((response) => {
            const {
              data: { token },
            } = response;
            setTokenApi(token);
            const { _ } = jwtDecode(token);
            const idUdsuario = _;
            try {
              obtenerUsuario(idUdsuario).then((response) => {
                const { data } = response;
                toast.success("Bienvenido " + data.nombre);
                setRefreshCheckLogin(true);
              });
              //enrutamiento("/Dashboard");
            } catch (ex) {
              toast.error("Error al obtener el usuario");
            }
          })
          .catch((ex) => {
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
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="princContainer">
      <div className="container-princ">
        <div className="form-container">
          <div className="mb-4">
            <img src={imagenLogin} width="100%" height="100%" />
          </div>
          <Form onSubmit={onSubmit} onChange={onChange}>
            <div>
              <Form.Control
                type={mostrarPassword ? "text" : "password"}
                name="password"
                defaultValue={formData.password}
                placeholder="Contraseña"
                className="txtPassword"
              />
              <FontAwesomeIcon
                title="Mostrar contraseña"
                icon={!mostrarPassword ? faEyeSlash : faEye}
                onClick={togglePasswordVisiblity}
              />{" "}
              Mostrar contraseña
            </div>
            <div className="d-flex justify-content-center mt-3">
              <Button
                title="Iniciar sesión"
                type="submit"
                data-mdb-ripple="true"
                className="button_slide slide_right"
                disabled={signInLoading}
              >
                {!signInLoading ? (
                  <>
                    <FontAwesomeIcon icon={faRightToBracket} /> Iniciar Sesión
                  </>
                ) : (
                  <Spinner animation="border" />
                )}
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <div class="screen__background">
        <span class="screen__background__shape screen__background__shape4"></span>
        <span class="screen__background__shape screen__background__shape2"></span>
      </div>
      <footer className="footer">
        <div>
          ©{new Date().getFullYear()} Copyright:{" "}
          <a
            href="https://ideasysolucionestecnologicas.com"
            target="_blank"
            rel="noreferrer"
            title="Ir al sitio web de la empresa"
          >
            Ideas y Soluciones Tecnológicas S.A de C.V
          </a>
        </div>
      </footer>
    </div>
  );
}

function initialFormValue() {
  return {
    usuario: "",
    password: "",
  };
}

export default Login;
