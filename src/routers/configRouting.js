import Registro from "../pages/registro/Registro";
import TablaRegistros from "../pages/registro/TablaRegistros";
import Login from "../pages/registro/login";

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

];
