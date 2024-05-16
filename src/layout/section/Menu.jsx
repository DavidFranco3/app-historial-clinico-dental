import { faPenToSquare, faTable, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getTokenApi,
  isExpiredToken,
  logoutApi,
  obtenidusuarioLogueado,
} from "../../api/auth";
import React from "react";
import {
  useNavigate
} from "react-router-dom";
import { toast } from "react-toastify";

const Menu = () => {

  const redirecciona = useNavigate();

  //Para cerrar la sesion
  const cerrarSesion = () => {
    toast.success("Sesión cerrada");
    redirecciona("/login")
    logoutApi();
  }

  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4 d-flex flex-column">
        {/* Brand Logo */}
        <a href="" className="brand-link">
          <img
            src="/dist/img/color.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">Rehabilitación Bucal</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar flex-grow-1">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="/dist/img/icon.png"
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <a href="#" className="d-block">
                Administrador
              </a>
            </div>
          </div>
          {/* SidebarSearch Form */}
          <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input
                className="form-control form-control-sidebar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw" />
                </button>
              </div>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <a href="/registro" className="nav-link">
                  <FontAwesomeIcon icon={faPenToSquare} className="nav-icon" />
                  <p>
                    Alta de expediente
                  </p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/tablaRegistros" className="nav-link">
                  <FontAwesomeIcon icon={faTable} className="nav-icon" />
                  <p>
                    Mis expedientes clinicos
                  </p>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        {/* Botón de Cerrar sesión */}
        <div className="d-flex justify-content-center mb-2">
          <button onClick={() => { cerrarSesion() }} className="btn btn-danger">
            <FontAwesomeIcon icon={faArrowLeftLong} className="nav-icon" />
            &nbsp; Cerrar sesión
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Menu;
