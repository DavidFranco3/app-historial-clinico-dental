import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Badge, Button } from 'react-bootstrap';
import { pdfMake } from 'pdfmake/build/vfs_fonts';
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

  // Para la modicicación de los registros
  const enrutamiento = useNavigate();

  const vistaPreviaRegistro = (id) => {
    enrutamiento(`/editarRegistro/${id}`)
  }

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

   //Editar registro
   function edicionRegistro(expediente) {
    
   }

  const columns = [
    {
      name: <span className='h4 text-center' >Nombre</span>,
      selector: row => row.nombre,
      sortable: false,
      style: {
        fontSize: '15px'
      },
      center: true,
      reorder: false
    },
    {
      name: <span className='h4 text-center' >Edad</span>,
      selector: row => row.edad,
      sortable: false,
      style: {
        fontSize: '15px'
      },
      center: true,
      reorder: false
    },
    {
      name: <span className='h4 text-center' >Sexo</span>,
      selector: row => row.sexo,
      sortable: false,
      style: {
        fontSize: '15px'
      },
      center: true,
      reorder: false
    },
    {
      name: <span className='h4 text-center' >Escolaridad </span>,
      selector: row => row.escolaridad,
      sortable: false,
      style: {
        fontSize: '15px'
      },
      center: true,
      reorder: false
    },
    {
      name: <span className='h4 text-center' >Fecha de nacimiento</span>,
      selector: row => row.fechaNacimiento,
      sortable: false,
      style: {
        fontSize: '15px'
      },
      center: true,
      reorder: false
    },
    {
      name: <span className='h4 text-center' >Expediente</span>,
      selector: row => row.expediente,
      sortable: false,
      style: {
        fontSize: '15px'
      },
      center: true,
      reorder: false
    },
    {
      name: <span className='h4 text-center' >Correo electrónico</span>,
      selector: row => row.email,
      sortable: false,
      style: {
        fontSize: '15px'
      },
      center: true,
      reorder: false
    },
    {
      name: <span className='h4 text-center' >Teléfono</span>,
      selector: row => row.telefono,
      sortable: false,
      style: {
        fontSize: '15px'
      },
      center: true,
      reorder: false
    },
    {
      name: <span className='h4 text-center' >Estado</span>,
      style: {
        fontSize: '15px',

      },
      center: true,
      reorder: false,
      selector: row => row.estado
    },
    {
      name: <span className='h4 text-center' >Acciones</span>,
      center: true,
      reorder: true,
      selector: row => (
        <>  

        <Badge
          bg='success'
          title='Editar Registro'
          className='eliminarProveedor'
          onClick={() => {
            vistaPreviaRegistro(row.id)
          }}
        >
          <FontAwesomeIcon icon={faPen} className="text-lg bs-success" />
        </Badge>
          
          <span className='mx-1'></span>

          <Badge
            bg="danger"
            className="eliminarProveedor"
            title="Eliminar"
            style={{cursor: 'pointer'}}
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
