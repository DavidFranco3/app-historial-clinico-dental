import { useEffect, useState } from 'react';
import { Container, Badge } from 'react-bootstrap';
import Autenticate from "../../layout/Autenticate";
import { listarHistoriaClinica } from "../../api/historiaClinica";
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faPlus,
  faBars,
  faArrowDownLong,
  faTrashCan
} from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "../../utils/withRouter";
import Eliminar from "./Eliminar";
import BasicModal from "../../components/Modal/BasicModal";

const TablaRegistros = ({ history, location }) => {

  // Para hacer uso del modal
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const [titulosModal, setTitulosModal] = useState(null);

  const [listarOrdenes, setListOrdenes] = useState([]);

  const obtenerOrdenesServicio = () => {
    try {
      listarHistoriaClinica()
        .then((response) => {
          const { data } = response;

          if (!listarOrdenes && data) {
            setListOrdenes(formatModelOrdenes(data));
          } else {
            const datosOrdenes = formatModelOrdenes(data);
            setListOrdenes(datosOrdenes);
          }
        })
        .catch((e) => { });
    } catch (e) { }
  };

  useEffect(() => {
    obtenerOrdenesServicio();
  }, [location]);

  //Para la eliminacion de compras
  const eliminacionHistorial = (content) => {
    setTitulosModal("Eliminando historial");
    setContentModal(content);
    setShowModal(true);
  }

  const columns = [
    {
      name: "Nombre",
      selector: row => row.nombre,
      sortable: false,
      center: true,
      reorder: false
    },
    {
      name: "Edad",
      selector: row => row.edad,
      sortable: false,
      center: true,
      reorder: false
    },
    {
      name: "Sexo",
      selector: row => row.sexo,
      sortable: false,
      center: true,
      reorder: false
    },
    {
      name: "Escolaridad",
      selector: row => row.escolaridad,
      sortable: false,
      center: true,
      reorder: false
    },
    {
      name: "Fecha de nacimiento",
      selector: row => row.fechaNacimiento,
      sortable: false,
      center: true,
      reorder: false
    },
    {
      name: "Expediente",
      selector: row => row.expediente,
      sortable: false,
      center: true,
      reorder: false
    },
    {
      name: "Correo electronico",
      selector: row => row.email,
      sortable: false,
      center: true,
      reorder: false
    },
    {
      name: "Telefono",
      selector: row => row.telefono,
      sortable: false,
      center: true,
      reorder: false
    },
    {
      name: 'Estado',
      center: true,
      reorder: false,
      selector: row => row.estado
    },
    {
      name: "Acciones",
      center: true,
      reorder: true,
      selector: row => (
        <>
          <Badge
            bg="danger"
            className="eliminarProveedor"
            title="Eliminar"
            onClick={() => {
              eliminacionHistorial(
                <Eliminar
                  data={row}
                  setShowModal={setShowModal}
                  history={history}
                />
              )
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} className="text-lg" />
          </Badge>
        </>
      )
    }
  ];

  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de'
  };

  const [resetPaginationToogle, setResetPaginationToogle] = useState(false);

  return (
    <div>
      <Autenticate>
        <Container fluid>
          <DataTable
            columns={columns}
            noDataComponent="No hay registros para mostrar"
            data={listarOrdenes}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            paginationResetDefaultPage={resetPaginationToogle}
            sortIcon={<FontAwesomeIcon icon={faArrowDownLong} />}
          />
        </Container>
      </Autenticate>
      <BasicModal show={showModal} setShow={setShowModal} title={titulosModal}>
        {contentModal}
      </BasicModal>
    </div>
  );
};

function formatModelOrdenes(data) {
  const dataTemp = [];
  data.forEach((data) => {
    dataTemp.push({
      id: data._id,
      nombre: data.datosPaciente.nombre,
      edad: data.datosPaciente.edad,
      sexo: data.datosPaciente.sexo,
      escolaridad: data.datosPaciente.escolaridad,
      fechaNacimiento: data.datosPaciente.fechaNacimiento,
      expediente: data.datosPaciente.expediente,
      email: data.datosPaciente.email,
      telefono: data.datosPaciente.telefono,
      estado: data.estado,
    });
  });
  return dataTemp;
}

export default withRouter(TablaRegistros);
