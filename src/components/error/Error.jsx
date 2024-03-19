import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import logo from "../../assets/img/logo.jpeg";
import imagePage from "../../assets/img/page404.png";
import image404 from "../../assets/img/404.png";

export const ErrorPantalla = () => {
  return (
    <>
      <div className="principalError">
        <Navbar className="barraPrincipal" data-bs-theme="dark">
          <Container>
            <Navbar.Brand>
              <img className="logoPrincipal" src={logo} />
            </Navbar.Brand>
            <Navbar.Toggle />
          </Container>
        </Navbar>
        <div className="errorMessage">
          <div className="imagenbajaError">
            <img src={image404} className="imagen404" alt="Error 404" />
          </div>
          
          <div className="errorText">
            <h3>
            Lo sentimos, la página a la que estas intentando acceder no esta disponible!!!!
            </h3>
          </div>
        </div>
      </div>
      <footer className="footerPrincipal">
        <div className="textFooter">
          <p>Domicilio</p> CALLE VICENTE RIVAPALACIO, 34, CENTRO, SAN JUAN DEL
          RIO, QRO, C.P. 76800
        </div>
      </footer>
    </>
  );
};
