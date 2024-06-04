import Registro from "../pages/registro/Registro";
import TablaRegistros from "../pages/registro/TablaRegistros";
import Login from "../pages/registro/login";
import editarRegistro from "../pages/registro/EdicionRegistro"
import Formatos from "../pages/formatos/Formatos";

export default [
  {
    path: "/registro",
    page: Registro,
  },
  {
    path: "/login",
    page: Login,
  },
  {
    path: "/tablaRegistros",
    page: TablaRegistros,
  },
  {
    path: "/editarRegistro/:id",
    page: editarRegistro,
  },
  {
    path: "/formatos",
    page: Formatos,
  }

];
