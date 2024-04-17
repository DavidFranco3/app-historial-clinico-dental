import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Autenticate from "../../layout/Autenticate";
import { listarHistoriaClinica } from "../../api/historiaClinica";
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faPlus,
  faBars,
  faArrowDownLong
} from "@fortawesome/free-solid-svg-icons";


const TablaRegistros = () => {

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
  }, []);


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
        selector: row =>  row.estado
    },
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

export default TablaRegistros;
