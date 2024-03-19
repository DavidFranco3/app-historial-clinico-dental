import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import logo from "../../assets/img/logo.jpeg";
import { Link } from "react-router-dom";

export const errorSesion = () => {
  return (
    <>
      <Navbar className="barraPrincipal" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>
            <img className="logoPrincipal" src={logo} />
          </Navbar.Brand>
          <Navbar.Toggle />
        </Container>
      </Navbar>
      <div className="errorSesionBody">
        <div className="error-container">
        <div className="error-text">😵</div>
          <h1 className="error-title">ERROR!!!</h1>
          <p className="error-message">
            Lo sentimos, la página que estás buscando no se encuentra.
          </p>
          <p>
            <Link to="/login" className="error-link">
              Volver a la página de inicio de sesión
            </Link>
          </p>
        </div>
      </div>
      <footer className="footerPrincipal">
        <div className="textFooter">
          <h6>Domicilio</h6>
          <label>
            CALLE VICENTE RIVAPALACIO, 34, CENTRO, SAN JUAN DEL RIO, QRO, C.P.
            76800
          </label>
        </div>
      </footer>
    </>
  );
};
