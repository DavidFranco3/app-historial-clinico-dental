import { useEffect, useState, useContext, createContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Autenticate from "../../layout/Autenticate";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCloudArrowUp, faPen } from "@fortawesome/free-solid-svg-icons";
import Container from "../../components/presentational/Container";
import MultiStep from "react-multistep";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import "./style.css";
import imagenFondo from "../../assets/img/fondo.jpeg"
import imgLesionCariosa from "../../assets/img/simbologia/LesionCariosa.png"
import imgIndExt from "../../assets/img/simbologia/Indicadoparaextraerse.png"
import imgObturado from "../../assets/img/simbologia/Obturado.png"
import imgEspacioVacio from "../../assets/img/simbologia/EspacioVacio.png"
import imgDiSupNum from "../../assets/img/simbologia/DienteSuperiorNumerado.png"
import imgRetGin from "../../assets/img/simbologia/RetraccionGingival.png"
import imgMovDent from "../../assets/img/simbologia/MovilidadDentaria.png"
import { obtenerHistoriaClinica, actualizarHistoriaClinica } from "../../api/historiaClinica";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { toast } from "react-toastify";
import BasicModal from "../../components/Modal/BasicModal";
import RegistroProcedimiento from "./AnadirRegistro"; 
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const SharedStateContext = createContext();

const steps = [
  { component: <StepOne /> },
  { component: <StepTwo /> },
  { component: <StepThree /> },
  { component: <StepFour /> },
  { component: <StepFive /> },
  { component: <StepSix /> },
  { component: <StepSeven /> },
  { component: <StepEight /> },
  { component: <StepNine /> },
];

function StepOne() {
  // Para almacenar los datos del formulario
  const { formData, setFormData } = useContext(SharedStateContext);
  //console.log(formData)
  const onChange = (e) => {
    const { name, value, checked, type } = e.target;
    const keys = name.split('.');
    const level1 = keys[0];
    const level2 = keys[1];

    setFormData((prev) => ({
        ...prev,
        [level1]: {
            ...prev[level1],
            [level2]: type === 'checkbox' ? checked : value
        }
    }));
};

  return (
    <Form onChange={onChange}>
      <div>
        <h2 className="titulosMultiStep">Datos personales</h2>
        <div>

          {/*NOMBRE Y EDAD*/}
          <Row className="justify-content-center mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={4} lg={4}>
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Nombre del paciente:</Form.Label>
                <Form.Control name="datosPaciente.nombre" defaultValue={formData?.datosPaciente?.nombre || ''} onChange={onChange} type="text" />
              </div>
            </Col>
            <Col sm={12} md={4} lg={4}>
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Edad (Años):</Form.Label>
                <Form.Control name="datosPaciente.edad" defaultValue={formData?.datosPaciente?.edad} type="number" />
              </div>
            </Col>
          </Row>

          {/*SEXO Y FECHA DE NACIMIENTO*/}
          <Row className="justify-content-center mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={4} lg={4}>
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Sexo:</Form.Label>
                <div className="d-flex flex-column align-items-center" > 
                  <div>
                    <Form.Check
                      type="radio"
                      name="sexoPaciente"
                      label="Masculino"
                      value="Masculino"
                      checked={formData?.datosPaciente?.sexo === "Masculino"}
                      onChange={onChange}
                      inline
                    />
                    <Form.Check
                      type="radio"
                      name="sexoPaciente"
                      label="Femenino"
                      value="Femenino"
                      checked={formData?.datosPaciente?.sexo === "Femenino"}
                      onChange={onChange}
                      inline
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={12} md={4} lg={4}>
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Fecha de nacimiento:</Form.Label>
                <Form.Control name="fechaNacimientoPaciente" defaultValue={formData?.datosPaciente?.fechaNacimiento} type="date" />
              </div>
            </Col>
          </Row>


           {/*EXPEDIENTE Y ESCOLARIDAD*/}
           <Row className="justify-content-center mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={4} lg={4}>
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Expediente:</Form.Label>
                <Form.Control name="expedientePaciente" defaultValue={formData?.datosPaciente?.expediente} type="text" />
              </div>
            </Col>
            <Col sm={12} md={4} lg={4}>
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Escolaridad:</Form.Label>
                <Form.Control name="escolaridadPaciente" defaultValue={formData?.datosPaciente?.escolaridad} type="text" />
              </div>
            </Col>
          </Row>

          {/*TELEFONO*/}
          <Row className="justify-content-center mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={4} lg={4}>
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Teléfono particular o celular:</Form.Label>
                <Form.Control name="telefonoPaciente" defaultValue={formData?.datosPaciente?.telefono} type="tel" />
              </div>
            </Col>
            <Col sm={12} md={4} lg={4}>
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Correo electronico:</Form.Label>
                <Form.Control name="emailPaciente" defaultValue={formData?.datosPaciente?.email || ''} onChange={onChange} type="email" />
              </div>
            </Col>
          </Row>
         
        </div>
      </div>
    </Form>
  );
}

function StepTwo() {
  // Para almacenar los datos del formulario
  const { formData, setFormData } = useContext(SharedStateContext);
  console.log(formData)
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    const { name, checked } = e.target;
  }

  const onChangeMedicamento = (e) => {
    // actualizamos el estado según si el checkbox está marcado o no
    setFormData({
      ...formData,
      interrogatorio: {
        ...formData.interrogatorio,
        [e.target.name]: e.target.checked ? e.target.value : '',
      },
    });
  };

  return (
    <div>
      <h2 className="titulosMultiStep">Interrogatorio</h2>
      <hr />
      <div>
        <Form onChange={onChange}>
          {/*MOTIVO DE CONSULTA*/}
          <Row className="justify-content-center mb-2 mb-md-4 mb-lg-7">
            <Col
              sm={12}
              md={4}
              lg={4}
            >
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Motivo de la consulta:</Form.Label>
                <Form.Control
                  name="motivoConsulta"
                  defaultValue={formData?.interrogatorio?.motivoConsulta}
                  as="textarea"
                  placeholder="Describe detalladamente el motivo de la consulta"
                />
              </div>
            </Col>
          </Row>

          {/*PADECIMIENTO ACTUAL*/}
          <Row className="justify-content-center mb-2 mb-md-4 mb-lg-7">
            <Col
              sm={12}
              md={4}
              lg={4}
            >
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Padecimiento actual:</Form.Label>
                <Form.Control
                name="padecimientoActual"
                defaultValue={formData?.interrogatorio?.padecimientoActual}
                as="textarea"
                placeholder="Describe los padecimientos que tiene actualmente el paciente"
                />
              </div>
            </Col>
          </Row>

         {/*PADECIMIENTOS SISTEMICOS*/}
         <Row className="justify-content-center mb-2 mb-md-4 mb-lg-7">
            <Col
              sm={12}
              md={4}
              lg={4}
            >
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Padecimientos sistémicos de interés para el caso:</Form.Label>
                <Form.Control
                name="padecimientosSistemticos"
                defaultValue={formData?.interrogatorio?.padecimientosSistemticos}
                as="textarea"
                placeholder="Describe los padecimientos sistémicos que sufre el paciente"
                />
              </div>
            </Col>
          </Row>

          {/*¿MEDICAMENTOS?*/}
          <Row className="justify-content-center mb-2 mb-md-4 mb-lg-7">
            <Col
              sm={12}
              md={4}
              lg={4}
            >
              <div className="d-flex flex-column align-items-center">
                <Form.Label>¿Está tomando algún medicamento?:</Form.Label>
                <div className="d-flex flex-column align-items-center">
                  <div>
                    <Form.Check
                      type="checkbox"
                      name="tomandoMedicamento"
                      label="No"
                      inline
                      value="No"
                      checked={formData?.interrogatorio?.tomandoMedicamento === "No"}
                      onChange={onChangeMedicamento}
                    />
                    <Form.Check
                      type="checkbox"
                      name="tomandoMedicamento"
                      label="Sí"
                      inline
                      value="Si"
                      checked={formData?.interrogatorio?.tomandoMedicamento === "Si"}
                      onChange={onChangeMedicamento}
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>

        </Form>
      </div>
    </div>
  );
}

function StepThree() {
  // Para almacenar los datos del formulario
  const { formData, setFormData } = useContext(SharedStateContext);
  console.log(formData)
   // Función para manejar cambios en los inputs del formulario
  const onChange = (e) => {
    const { name, value, checked, type } = e.target;
    const [category, key] = name.split('.');

    // Actualiza formData basándose en si el input es un checkbox o no
    setFormData(prevFormData => ({
      ...prevFormData,
      antecedentesHeredofamiliares: {
        ...prevFormData.antecedentesHeredofamiliares,
        [category]: {
          ...prevFormData.antecedentesHeredofamiliares[category],
          // Si es checkbox, actualiza 'estado', si no, actualiza 'descripcion'
          [key]: type === 'checkbox' ? (checked ? "Si" : "No") : value
        }
      }
    }));
  };

  return (
    <div>
      <h2 className="titulosMultiStep">Antecedentes Heredofamiliares</h2>
      <hr />
      <div>
        <Form onChange={onChange}>
          
          {/*DIABETES E HIPERTENSIÓN*/}         
          <Row className="justify-content-center mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  type="checkbox"
                  label="Diabetes"
                  name="diabetes.estado"
                  checked={formData?.antecedentesHeredofamiliares?.diabetes.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="diabetes.descripcion"
                  value={formData?.antecedentesHeredofamiliares?.diabetes.descripcion}
                  onChange={onChange}
                />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  type="checkbox"
                  label="Hipertensión"
                  name="hipertension.estado"
                  checked={formData?.antecedentesHeredofamiliares?.hipertension.estado === "Si"}
                  onChange={onChange}
                />
                
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="hipertension.descripcion"
                  value={formData?.antecedentesHeredofamiliares?.hipertension.descripcion}
                  onChange={onChange}
                />
              </div>
            </Col>
          </Row>


          {/*NEFROPATÍAS Y TUBERCULOSIS*/}
          <Row className=" justify-content-center mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
              <Form.Check
                  type="checkbox"
                  label="Nefropatías"
                  name="nefropatias.estado"
                  checked={formData?.antecedentesHeredofamiliares?.nefropatias.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="nefropatias.descripcion"
                  value={formData?.antecedentesHeredofamiliares?.nefropatias.descripcion}
                  onChange={onChange}
                />
                
              </div>
              
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
              <Form.Check
                  type="checkbox"
                  label="Tuberculosis"
                  name="tuberculosis.estado"
                  checked={formData?.antecedentesHeredofamiliares?.tuberculosis.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="tuberculosis.descripcion"
                  value={formData?.antecedentesHeredofamiliares?.tuberculosis.descripcion}
                  onChange={onChange}
                />
                </div>
            </Col>
          </Row>

          {/*CANCER Y CARDIPATÍAS*/}
          <Row className="justify-content-center mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
            <div className="d-flex flex-column align-items-center">
            <Form.Check
                  type="checkbox"
                  label="Cáncer"
                  name="cancer.estado"
                  checked={formData?.antecedentesHeredofamiliares?.cancer.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="cancer.descripcion"
                  value={formData?.antecedentesHeredofamiliares?.cancer.descripcion}
                  onChange={onChange}
                />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
              <Form.Check
                  type="checkbox"
                  label="Cardiopatías"
                  name="cardiopatias.estado"
                  checked={formData?.antecedentesHeredofamiliares?.cardiopatias.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="cardiopatias.descripcion"
                  value={formData?.antecedentesHeredofamiliares?.cardiopatias.descripcion}
                  onChange={onChange}
                />
              </div>
            </Col>
          </Row>

          {/*ALERGÍAS Y OTROS*/}
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
              <Form.Check
                  type="checkbox"
                  label="Alergias"
                  name="alergias.estado"
                  checked={formData?.antecedentesHeredofamiliares?.alergias.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="alergias.descripcion"
                  value={formData?.antecedentesHeredofamiliares?.alergias.descripcion}
                  onChange={onChange}
                />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
              <Form.Check
                  type="checkbox"
                  label="Otros"
                  name="otros.estado"
                  checked={formData?.antecedentesHeredofamiliares?.otros.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="otros.descripcion"
                  value={formData?.antecedentesHeredofamiliares?.otros.descripcion}
                  onChange={onChange}
                />
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

function StepFour() {
  // Para almacenar los datos del formulario
  const { formData, setFormData } = useContext(SharedStateContext);
  console.log(formData)

  const onChange = (e) => {
    const { name, value, checked, type } = e.target;
    const [category, key] = name.split('.');

    // Actualiza formData basándose en si el input es un checkbox o no
    setFormData(prevFormData => ({
      ...prevFormData,
      antecedentesPersonalesPatologicos: {
        ...prevFormData.antecedentesPersonalesPatologicos,
        [category]: {
          ...prevFormData.antecedentesPersonalesPatologicos[category],
          // Si es checkbox, actualiza 'estado', si no, actualiza 'descripcion'
          [key]: type === 'checkbox' ? (checked ? "Si" : "No") : value
        }
      }
    }));
  };

  return (
    <div>
      <h2 className="titulosMultiStep">
        Antecedentes Personales Patológicos (A.P.P.)
      </h2>
      <hr />
      <div className="d-flex-block align-items-center">
        <Form onChange={onChange}>
          {/*DIABETES E HIPERTENSIÓN*/}
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  type="checkbox"
                  label="Diabetes"
                  name="diabetes.estado"
                  checked={formData?.antecedentesPersonalesPatologicos?.diabetes.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="diabetes.descripcion"
                  value={formData?.antecedentesPersonalesPatologicos?.diabetes.descripcion}
                  onChange={onChange}
                />  
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  type="checkbox"
                  label="Hipertensión"
                  name="hipertension.estado"
                  checked={formData?.antecedentesPersonalesPatologicos?.hipertension.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="hipertension.descripcion"
                  value={formData?.antecedentesPersonalesPatologicos?.hipertension.descripcion}
                  onChange={onChange}
                />
              </div>
            </Col>
          </Row>

          {/*NEFROPATÍAS Y TUBERCULOSIS*/}
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">  
              <Form.Check
                  type="checkbox"
                  label="Nefropatías"
                  name="nefropatias.estado"
                  checked={formData?.antecedentesPersonalesPatologicos?.nefropatias.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="nefropatias.descripcion"
                  value={formData?.antecedentesPersonalesPatologicos?.nefropatias.descripcion}
                  onChange={onChange}
                />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
              <Form.Check
                  type="checkbox"
                  label="Tuberculosis"
                  name="tuberculosis.estado"
                  checked={formData?.antecedentesPersonalesPatologicos?.tuberculosis.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="tuberculosis.descripcion"
                  value={formData?.antecedentesPersonalesPatologicos?.tuberculosis.descripcion}
                  onChange={onChange}
                />
              </div>
            </Col>
          </Row>

          {/*CANCER Y CARDIPATÍAS*/}
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
              <Form.Check
                  type="checkbox"
                  label="Cáncer"
                  name="cancer.estado"
                  checked={formData?.antecedentesPersonalesPatologicos?.cancer.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="cancer.descripcion"
                  value={formData?.antecedentesPersonalesPatologicos?.cancer.descripcion}
                  onChange={onChange}
                />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
              <Form.Check
                  type="checkbox"
                  label="Cardiopatías"
                  name="cardiopatias.estado"
                  checked={formData?.antecedentesPersonalesPatologicos?.cardiopatias.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="cardiopatias.descripcion"
                  value={formData?.antecedentesPersonalesPatologicos?.cardiopatias.descripcion}
                  onChange={onChange}
                />
              </div>
            </Col>
          </Row>


          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
              <Form.Check
                  type="checkbox"
                  label="Alergias"
                  name="alergias.estado"
                  checked={formData?.antecedentesPersonalesPatologicos?.alergias.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="alergias.descripcion"
                  value={formData?.antecedentesPersonalesPatologicos?.alergias.descripcion}
                  onChange={onChange}
                />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
              <Form.Check
                  type="checkbox"
                  label="Toxicomanias"
                  name="toxicomanias.estado"
                  checked={formData?.antecedentesPersonalesPatologicos?.toxicomanias.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="toxicomanias.descripcion"
                  value={formData?.antecedentesPersonalesPatologicos?.toxicomanias.descripcion}
                  onChange={onChange}
                />
              </div>
            </Col>
          </Row>

          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
              <Form.Check
                  type="checkbox"
                  label="Sanguíneo"
                  name="grupoSanguineo.estado"
                  checked={formData?.antecedentesPersonalesPatologicos?.grupoSanguineo.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="grupoSanguineo.descripcion"
                  value={formData?.antecedentesPersonalesPatologicos?.grupoSanguineo.descripcion}
                  onChange={onChange}
                />
              </div>
            </Col>

            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
              <Form.Check
                  type="checkbox"
                  label="Hemoragias"
                  name="transtornosHemorragicos.estado"
                  checked={formData?.antecedentesPersonalesPatologicos?.transtornosHemorragicos.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="transtornosHemorragicos.descripcion"
                  value={formData?.antecedentesPersonalesPatologicos?.transtornosHemorragicos.descripcion}
                  onChange={onChange}
                />
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

function StepFive() {
  // Para almacenar los datos del formulario
  const { formData, setFormData } = useContext(SharedStateContext);
  console.log(formData)

  // Manejador de cambios para actualizar el estado de formData
  const onChange = (e) => {
    const { name, checked } = e.target;

    // Actualizar formData
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: checked ? "Si" : "No" // Establecer el valor basado en si el checkbox está marcado
    }));
  };
  
  return (
    <div>
      <h2 className="titulosMultiStep">
        Antecedentes Personales No Patológicos (A.P.N.P.)
      </h2>
      <hr />
      <div>
        <Form onChange={onChange}>
          <Row className="mb-2 mb-md-4 mb-lg-7 justify-content-center">
            <Col sm={12} md={4} lg={4} className="d-flex justify-content-center">
              <Form.Check
                checked={formData?.antecedentesPersonalesNoPatologicos?.alimentacion === "Si"} // Esta propiedad refleja el estado actual del checkbox
                onChange={onChange} // Añadir el onChange que maneja la actualización del estado
                name="alimentacion"
                value="Si"
                type="checkbox"
                label={"Alimentación"}
              />
            </Col>
            <Col sm={12} md={4} lg={4} className="d-flex justify-content-center">
              <Form.Check
                checked={formData?.antecedentesPersonalesNoPatologicos?.higiene === "Si"} // Esta propiedad refleja el estado actual del checkbox
                onChange={onChange} // Añadir el onChange que maneja la actualización del estado
                name="higiene"
                value="Si"
                type="checkbox"
                label={"Higiene"}
              />
            </Col>
            <Col sm={12} md={4} lg={4} className="d-flex justify-content-center">
              <Form.Check
                checked={formData?.antecedentesPersonalesNoPatologicos?.convivenciaConAnimales === "Si"} // Esta propiedad refleja el estado actual del checkbox
                onChange={onChange} // Añadir el onChange que maneja la actualización del estado
                name="convivenciaConAnimales"
                value="Si"
                type="checkbox"
                label={"Convivencia con animales"}
              />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7 justify-content-center">
            <Col sm={12} md={4} lg={4} className="d-flex justify-content-center" >
              <Form.Check
                checked={formData?.antecedentesPersonalesNoPatologicos?.tatuajes === "Si"} // Esta propiedad refleja el estado actual del checkbox
                onChange={onChange} // Añadir el onChange que maneja la actualización del estado
                name="tatuajes"
                value="Si"
                type="checkbox"
                label={"Tatuajes"}
              />
            </Col>
            <Col sm={12} md={4} lg={4} className="d-flex justify-content-center" >
              <Form.Check
                checked={formData?.antecedentesPersonalesNoPatologicos?.deportes === "Si"} // Esta propiedad refleja el estado actual del checkbox
                onChange={onChange} // Añadir el onChange que maneja la actualización del estado
                name="deportes"
                value="Si"
                type="checkbox"
                label={"Deportes"}
              />
            </Col>
            <Col sm={12} md={4} lg={4} className="d-flex justify-content-center" >
              <Form.Check
                checked={formData?.antecedentesPersonalesNoPatologicos?.vacunas === "Si"} // Esta propiedad refleja el estado actual del checkbox
                onChange={onChange} // Añadir el onChange que maneja la actualización del estado
                name="vacunas"
                value="Si"
                type="checkbox"
                label={"Vacunas"}
              />
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

function StepSix() {
  // Para almacenar los datos del formulario
  const { formData, setFormData } = useContext(SharedStateContext);
  console.log(formData)
  
  // Manejador de cambios para actualizar el estado de formData
  const onChange = (e) => {
    const { name, checked } = e.target;

    // Actualizar formData
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: checked ? "Si" : "No" // Establecer el valor basado en si el checkbox está marcado
    }));
  };

  return (
    <div>
      <h2 className="titulosMultiStep">Signos vitales</h2>
      <hr />
      <div>
        <Form onChange={onChange}>
          <Row className="d-flex mb-2 mb-md-4 mb-lg-7 justify-content-center">  
            {/* TA */}
            <Col sm={6} md={3} lg={3} className="d-flex justify-content-center">
              <Form.Check
                type="checkbox"
                name="TA"
                checked={formData?.signosVitales?.TA === "Si"}
                onChange={onChange}
                label={"TA"}
              />
            </Col>
            <Col sm={6} md={3} lg={3} className="d-flex justify-content-center">
              <Form.Check
                type="checkbox"
                name="temperatura"
                checked={formData?.signosVitales?.temperatura === "Si"}
                onChange={onChange}
                label={"Temperatura"}
              />
            </Col>
            <Col sm={6} md={3} lg={3} className="d-flex justify-content-center">
              <Form.Check
                type="checkbox"
                name="FR"
                checked={formData?.signosVitales?.FR === "Si"}
                onChange={onChange}
                label={"FR"}
              />
            </Col>
            <Col sm={6} md={3} lg={3} className="d-flex justify-content-center">
              <Form.Check
                type="checkbox"
                name="peso"
                checked={formData?.signosVitales?.peso === "Si"}
                onChange={onChange}
                label={"Peso"}
              />
            </Col>
          </Row>

          <Row className="d-flex mb-2 mb-md-4 mb-lg-7 justify-content-center">  
            {/* TA */}
            <Col sm={6} md={3} lg={3} className="d-flex justify-content-center">
              <Form.Check
                type="checkbox"
                name="talla"
                checked={formData?.signosVitales?.talla === "Si"}
                onChange={onChange}
                label={"Talla"}
              />
            </Col>
            <Col sm={6} md={3} lg={3} className="d-flex justify-content-center">
              <Form.Check
                type="checkbox"
                name="glucosaCapilar"
                checked={formData?.signosVitales?.glucosaCapilar === "Si"}
                onChange={onChange}
                label={"Glucosa Capilar"}
              />
            </Col>
            <Col sm={6} md={3} lg={3} className="d-flex justify-content-center">
              <Form.Check
                type="checkbox"
                name="FC"
                checked={formData?.signosVitales?.FC === "Si"}
                onChange={onChange}
                label={"FC"}
              />
            </Col>
          </Row>

        </Form>
      </div>
    </div>
  );
}

function StepSeven() {
  const { formData, setFormData } = useContext(SharedStateContext);

  const onCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const path = name.split(".");
    setFormData(prevFormData => ({
      ...prevFormData,
      estudios: {
        ...prevFormData.estudios,
        [path[0]]: {
          ...prevFormData.estudios[path[0]],
          estado: checked ? "Si" : "No",
        },
      },
    }));
  };

  const onTextChange = (e) => {
    const { name, value } = e.target;
    const path = name.split(".");
    setFormData(prevFormData => ({
      ...prevFormData,
      estudios: {
        ...prevFormData.estudios,
        [path[0]]: {
          ...prevFormData.estudios[path[0]],
          [path[1]]: value,
        },
      },
    }));
  };

  return (
    <div>
      <h2 className="titulosMultiStep">Estudios</h2>
      <hr />
      <Form>
        <Row className="mb-2 mb-md-4 mb-lg-7">
          {/* Estudios de gabinete */}
          <Col sm={12} md={6} lg={6} className="d-flex flex-column align-items-center">
            <div className="mb-2">
              <Form.Check
                type="checkbox"
                checked={formData?.estudios?.estudiosGabinete.estado === "Si"}
                name="estudiosGabinete.estado"
                onChange={onCheckboxChange}
                label={"Estudios de gabinete"}
              />
            </div>
            <Form.Control
              as="textarea"
              value={formData?.estudios?.estudiosGabinete.descripcion || ''}
              name="estudiosGabinete.descripcion"
              onChange={onTextChange}
              placeholder="Descripción de los estudios de gabinete (Radiografías, Resonancias, etc.)"
            />
            {/* El input de tipo file no es manejado por el estado de React */}
            <Form.Control
              name="imagenEstudiosGabinete"
              type="file"
              className="mt-2"
            />
          </Col>
          {/* Estudios de laboratorio */}
          <Col sm={12} md={6} lg={6} className="d-flex flex-column align-items-center">
            <div className="mb-2">
              <Form.Check
                type="checkbox"
                checked={formData?.estudios?.estudiosLaboratorio.estado === "Si"}
                name="estudiosLaboratorio.estado"
                onChange={onCheckboxChange}
                label={"Estudios de Laboratorio"}
              />
            </div>
            <Form.Control
              as="textarea"
              value={formData?.estudios?.estudiosLaboratorio.descripcion || ''}
              name="estudiosLaboratorio.descripcion"
              onChange={onTextChange}
              placeholder="Descripción de los estudios de Laboratorio (Análisis, etc.)"
            />
            {/* El input de tipo file no es manejado por el estado de React */}
            <Form.Control
              name="imagenEstudiosLaboratorio"
              type="file"
              className="mt-2"
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
}

function StepEight() {
  // Para almacenar los datos del formulario
  const { formData, setFormData } = useContext(SharedStateContext);
  console.log(formData)
  
  const onChange = (e) => {
    const { name, value, checked, type } = e.target;
    const [category, key] = name.split('.');

    // Actualiza formData basándose en si el input es un checkbox o no
    setFormData(prevFormData => ({
      ...prevFormData,
      cavidadBucal: {
        ...prevFormData.cavidadBucal,
        [category]: {
          ...prevFormData.cavidadBucal[category],
          // Si es checkbox, actualiza 'estado', si no, actualiza 'descripcion'
          [key]: type === 'checkbox' ? (checked ? "Si" : "No") : value
        }
      }
    }));
  };

  return (
    <div>
      <h2 className="titulosMultiStep">
        Exploración de la cavidad bucal y anexos
      </h2>
      <hr />
      <div>
        <Form onChange={onChange}>

          {/*TEJIDOS BLANDOS*/}
         <Row className="justify-content-center mb-2 mb-md-4 mb-lg-7">
            <Col
              sm={12}
              md={4}
              lg={4}
            >
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Tejidos blandos:</Form.Label>
                <Form.Control
                defaultValue={formData?.cavidadBucal?.tejidosBlandos}
                name="tejidosBlandosCavidadBucal"
                as="textarea"
                placeholder="Describe los resultados de la exploración de los tejidos blandos"
                />
              </div>
            </Col>
          </Row>

          {/*TEJIDO OSEO*/}
          <Row className="justify-content-center mb-2 mb-md-4 mb-lg-7">
            <Col
              sm={12}
              md={4}
              lg={4}
            >
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Tejido óseo:</Form.Label>
                <Form.Control
                defaultValue={formData?.cavidadBucal?.tejidoOseo}
                name="tejidoOseoCavidadBucal"
                as="textarea"
                placeholder="Describe los resultados de la exploración del tejido óseo"
                />
              </div>
            </Col>
          </Row>

          {/*ARTICULACIÓN TEMPOROMANDIBULAR ATM*/}
          <Row className="justify-content-center mb-2 mb-md-4 mb-lg-7">
            <Col
              sm={12}
              md={4}
              lg={4}
            >
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Articulación temporomandibular (ATM):</Form.Label>
                <Form.Control
                  defaultValue={formData?.cavidadBucal?.ATM}
                  as="textarea"
                  placeholder="Describe los resultados de la exploración de la articulación temporomandibular (ATM)"
                />
              </div>
            </Col>
          </Row>
          
          {/*DOLOR Y CREPITACIÓN*/}
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6} className="d-flex flex-column align-items-center">
            <div className="mb-2">
                <Form.Check 
                  onChange={onChange}
                  checked={formData?.cavidadBucal?.dolor.estado === "Si"}
                  name="estadoDolor"
                  type="checkbox"
                  label={"Dolor"}
                 />
            </div>
              <Form.Control 
                defaultValue={formData?.cavidadBucal?.dolor.descripcion}
                name="descripcionDolor"
                as="textarea" 
                placeholder="Descripción del dolor"
              />
            </Col>
            <Col sm={12} md={6} lg={6} className="d-flex flex-column align-items-center">
              <div className="mb-2">
                <Form.Check 
                  onChange={onChange}
                  checked={formData?.cavidadBucal?.crepitacion.estado === "Si"}
                  name="estadoCrepitacion"
                  type="checkbox"
                  label={"Crepitación"}
                 />
              </div>
              <Form.Control
                defaultValue={formData?.cavidadBucal?.crepitacion.descripcion}
                name="descripcionCrepitacion"
                as="textarea"
                placeholder="Descripción de la crepitación"
              />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6} className="d-flex flex-column align-items-center">
              <Form.Check 
                onChange={onChange}
                checked={formData?.cavidadBucal?.subluxacion.estado === "Si"}
                name="estadoSubluxacion"
                type="checkbox"
                label={"Subluxación"}
              />
              <Form.Control
                defaultValue={formData?.cavidadBucal?.subluxacion.descripcion}
                name="descripcionsubluxacion"
                as="textarea"
                placeholder="Descripción de la subluxación"
              />
            </Col>
            <Col sm={12} md={6} lg={6} className="d-flex flex-column align-items-center">
              <Form.Check 
                onChange={onChange}
                checked={formData?.cavidadBucal?.anquilosis.estado === "Si"}
                name="estadoAnquilosis"
                type="checkbox"
                label={"Anquilosis"}
              />
              <Form.Control
                defaultValue={formData?.cavidadBucal?.anquilosis.descripcion}
                name="descripcionAnquilosis"
                as="textarea"
                placeholder="Descripción de la anquilosis"
              />
            </Col>
          </Row>

          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6} className="d-flex flex-column align-items-center">
              <div className="mb-2">
              <Form.Check 
                onChange={onChange}
                checked={formData?.cavidadBucal?.bruxismo.estado === "Si"}
                name="estadoBruxismo"
                type="checkbox"
                label={"Bruxismo"}
              />
              </div>
              <Form.Control
                defaultValue={formData?.cavidadBucal?.bruxismo.descripcion}
                name="descripcionBruxismo"
                as="textarea"
                placeholder="Descripción del bruxismo"
              />
            </Col>
            <Col sm={12} md={6} lg={6} className="d-flex flex-column align-items-center">
              <div className="mb-2"> 
              <Form.Check 
                onChange={onChange}
                checked={formData?.cavidadBucal?.espasmoMuscular.estado === "Si"}
                name="estadoEspasmoMuscular"
                type="checkbox"
                label={"Espasmo uscular"}
              />
              </div>
              <Form.Control
                defaultValue={formData?.cavidadBucal?.espasmoMuscular.descripcion}
                name="descripcionEspasmoMuscular"
                as="textarea"
                placeholder="Descripción del espasmo muscular"
              />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6} className="d-flex flex-column align-items-center">
              <div className="mb-2">
              <Form.Check 
                onChange={onChange}
                checked={formData?.cavidadBucal?.luxacion.estado === "Si"}
                name="estadoLuxación"
                type="checkbox"
                label={"Luxación"}
              />
              </div>
              <Form.Control
                defaultValue={formData?.cavidadBucal?.luxacion.descripcion}
                name="descripcionLuxacion"
                as="textarea"
                placeholder="Descripción de la luxación"
              />
            </Col>
          </Row>

          {/*DIAGNOSTICO*/}
          <Row className="justify-content-center mb-2 mb-md-4 mb-lg-7">
            <Col
              sm={12}
              md={4}
              lg={4}
            >
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Diagnostico:</Form.Label>
                <Form.Control defaultValue={formData?.cavidadBucal?.diagnostico} name="diagnostico" as="textarea" placeholder="Diagnóstico" />
              </div>
            </Col>
          </Row>

          {/*PRONOSTICO*/}
          <Row className="justify-content-center mb-2 mb-md-4 mb-lg-7">
            <Col
              sm={12}
              md={4}
              lg={4}
            >
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Pronostico:</Form.Label>
                <Form.Control defaultValue={formData?.cavidadBucal?.pronostico} name="pronostico" as="textarea" placeholder="Pronóstico" />
              </div>
            </Col>
          </Row>

          {/*PLAN DE TRATAMIENTO*/}
          <Row className="justify-content-center mb-2 mb-md-4 mb-lg-7">
            <Col
              sm={12}
              md={4}
              lg={4}
            >
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Plan de tratamiento:</Form.Label>
                <Form.Control defaultValue={formData?.cavidadBucal?.planTratamiento} name="planTratamiento" as="textarea" placeholder="Plan de tratamiento" />
              </div>
            </Col>
          </Row>
          
        </Form>
      </div>
    </div>
  );
}

function StepNine() {
  const [identificador, setIdentificador] = useState("");

  const {formData, setFormData} = useContext(SharedStateContext)

  const [procedimientos, setProcedimientos] = useState([]);

  const eliminarProcedimiento = (index) => {
    const updatedProcedimientos = formData.procedimientos.filter((_, i) => i !== index);
    setFormData({...formData, procedimientos: updatedProcedimientos});
  };

  const anadirProcedimiento = (nuevoProcedimiento) => {
    const updatedProcedimientos = [...formData.procedimientos, nuevoProcedimiento];
    setFormData({...formData, procedimientos: updatedProcedimientos});
  };

  useEffect(() => {
    console.log("Procedimientos actualizados:", procedimientos);
  }, [procedimientos]);
  

  // Para hacer uso del modal
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const [titulosModal, setTitulosModal] = useState(null);

  const activacionModal = (content) => {
    setTitulosModal("Añadir procedimientos");
    setContentModal(content);
    setShowModal(true);
  }

  const [pointsLC, setPointsLC] = useState([]);
  const [pointsIE, setPointsIE] = useState([]);
  const [pointsOB, setPointsOB] = useState([]);
  const [pointsEV, setPointsEV] = useState([]);
  const [pointsDSN, setPointsDSN] = useState([]);
  const [pointsRG, setPointsRG] = useState([]);
  const [pointsMD, setPointsMD] = useState([]);

  const handleClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (identificador === "LC") {
      setPointsLC([...pointsLC, { x, y }]);
    } else if (identificador === "IE") {
      setPointsIE([...pointsIE, { x, y }]);
    } else if (identificador === "OB") {
      setPointsOB([...pointsOB, { x, y }]);
    } else if (identificador === "EV") {
      setPointsEV([...pointsEV, { x, y }]);
    } else if (identificador === "DSN") {
      setPointsDSN([...pointsDSN, { x, y }]);
    } else if (identificador === "RG") {
      setPointsRG([...pointsRG, { x, y }]);
    } else if (identificador === "MD") {
      setPointsMD([...pointsMD, { x, y }]);
    }
  };

  return (
    <div>
      <div className="btnsSimbologia">
        <Button onClick={() => setIdentificador("LC")} variant="dark">Lesion cariosa</Button>
        <Button onClick={() => setIdentificador("IE")} variant="dark">
          Indicado para extraerse
        </Button>
        <Button onClick={() => setIdentificador("OB")} variant="dark">Obturado</Button>
        <Button onClick={() => setIdentificador("EV")} variant="dark">Espacio vacio</Button>
        <Button onClick={() => setIdentificador("DSN")} variant="dark">
          Diente superior numerado
        </Button>
        <Button onClick={() => setIdentificador("RG")} variant="dark">
          Retracción gingival
        </Button>
        <Button onClick={() => setIdentificador("MD")} variant="dark">
          Movilidad dentaria
        </Button>
      </div>
      <div className="divFig">
        <div className="divImageFig">
          <img src={imagenFondo} className="imagenFondoFig" />
        </div>
        <div className="divFigCa">
          <div
            style={{
              width: "82vw",
              height: "40vh",
              margin: "auto",
            }}
            onClick={handleClick}
          >
            {pointsLC.map((point, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: `${point.x}px`,
                  top: `${point.y}px`,
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                }}
              >
                <img src={imgLesionCariosa} width="100%" height="100%" />
              </div>
            ))}
            {pointsIE.map((point, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: `${point.x}px`,
                  top: `${point.y}px`,
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                }}
              >
                <img src={imgIndExt} width="100%" height="100%" />
              </div>
            ))}
            {pointsOB.map((point, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: `${point.x}px`,
                  top: `${point.y}px`,
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                }}
              ><img src={imgObturado} width="100%" height="100%" /></div>
            ))}
            {pointsEV.map((point, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: `${point.x}px`,
                  top: `${point.y}px`,
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                }}
              ><img src={imgEspacioVacio} width="100%" height="100%" /></div>
            ))}
            {pointsDSN.map((point, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: `${point.x}px`,
                  top: `${point.y}px`,
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                }}
              ><img src={imgDiSupNum} width="100%" height="100%" /></div>
            ))}
            {pointsRG.map((point, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: `${point.x}px`,
                  top: `${point.y}px`,
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                }}
              ><img src={imgRetGin} width="100%" height="100%" /></div>
            ))}
            {pointsMD.map((point, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: `${point.x}px`,
                  top: `${point.y}px`,
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                }}
              ><img src={imgMovDent} width="100%" height="100%" /></div>
            ))}
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <h2>Procedimientos</h2>
        <table className="table">
            <thead>
              <tr>
                <th scope="col">Fecha</th>
                <th scope="col">Tratamiento</th>
                <th scope="col">Tiempo</th>
                <th scope="col">Responsable</th>
                <th scope="col">Acción</th>
              </tr>
            </thead>
            <tbody>
            {formData.procedimientos.map((procedimiento, index) => (
            <tr key={index}>
              <td>{procedimiento.fecha}</td>
              <td>{procedimiento.tratamiento}</td>
              <td>{procedimiento.tiempo}</td>
              <td>{procedimiento.responsable}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => eliminarProcedimiento(index)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
            </tbody>
        </table>
          <div className="container mt-5">
            <button 
              className="btn btn-primary" 
              onClick={() => {
                activacionModal(
                  <RegistroProcedimiento
                    setShowModal = {setShowModal}
                    anadirProcedimiento={anadirProcedimiento}
                  />
                )
              }}
            >
              Añadir otro registro
            </button>
              <BasicModal show={showModal} setShow={setShowModal} title={titulosModal}>
                {contentModal}
              </BasicModal>
          </div>
      {/* ESPACIO EN BLANCO */}
      <div className="container mt-5"></div>
      </div>
    </div>
  );
}


const EditarHistoriaClinica = () => {

  const { id } = useParams(); // Obtiene el ID del paciente desde la URL
  const [formData, setFormData] = useState({
    // Aquí defines el estado inicial básico, antes de la carga
    datosPaciente: {},
    interrogatorio: {},
    antecedentesHeredofamiliares: {},
    antecedentesPersonalesPatologicos: {},
    antecedentesPersonalesNoPatologicos: {},
    signosVitales: {},
    estudios: {},
    cavidadBucal: {},
    procedimientos: []
  });

  useEffect(() => {
    // Función para cargar los datos del paciente
    const cargarDatosPaciente = async () => {
      try {
        const response = await obtenerHistoriaClinica(id);
        console.log("Datos cargados:", response.data);
        setFormData({
          // Aquí actualizas el estado con los datos obtenidos o mantienes los valores por defecto
          datosPaciente: response.data.datosPaciente || {},
          interrogatorio: response.data.interrogatorio || {},
          antecedentesHeredofamiliares: response.data.antecedentesHeredofamiliares || {},
          antecedentesPersonalesPatologicos: response.data.antecedentesPersonalesPatologicos || {},
          antecedentesPersonalesNoPatologicos: response.data.antecedentesPersonalesNoPatologicos || {},
          signosVitales: response.data.signosVitales || {},
          estudios: response.data.estudios || {},
          cavidadBucal: response.data.cavidadBucal || {},
          procedimientos: response.data.procedimientos || [] 
          // Repite para cada categoría según tu estructura de datos
        });
      } catch (error) {
        console.error('Error al cargar los datos del paciente:', error);
      }
    };

    cargarDatosPaciente();
  }, [id]);

  // Estado para realizar un seguimiento del índice del paso actual
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const totalSteps = steps.length;

  // Función para avanzar al siguiente paso
  const goToNextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  // Función para retroceder al paso anterior
  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  // Verificar si estamos en el último paso
  const isLastStep = currentStepIndex === totalSteps - 1;
  console.log(isLastStep)

  const onSubmit = async (e) => {
    e.preventDefault();
    try {

      const dataTemp = { 
        datosPaciente: {
          nombre: formData.nombrePaciente,
          edad: formData.edadPaciente,
          sexo: formData.sexoPaciente,
          escolaridad: formData.escolaridadPaciente,
          fechaNacimiento: formData.fechaNacimientoPaciente,
          expediente: formData.expedientePaciente,
          email: formData.emailPaciente,
          telefono: formData.telefonoPaciente,
        },
        interrogatorio: {
          motivoConsulta: formData.motivoConsulta,
          padecimientoActual: formData.padecimientoActual,
          padecimientosSistemticos: formData.padecimientosSistemticos,
          tomandoMedicamento: formData.tomandoMedicamento,
        },
        antecedentesHeredofamiliares: {
          diabetes: {
            estado: formData.estadoDiabetes,
            descripcion: formData.descripcionDiabetes
          },
          nefropatias: {
            estado: formData.estadoNefropatias,
            descripcion: formData.descripcionNefropatias
          },
          cancer: {
            estado: formData.estadoCancer,
            descripcion: formData.descripcionCancer
          },
          alergias: {
            estado: formData.estadoAlergias,
            descripcion: formData.descripcionAlergias
          },
          hipertension: {
            estado: formData.estadoHipertension,
            descripcion: formData.descripcionHipertension
          },
          tuberculosis: {
            estado: formData.estadoTuberculosis,
            descripcion: formData.descripcionTuberculosis
          },
          cardiopatias: {
            estado: formData.estadoCardiopatias,
            descripcion: formData.descripcionCardiopatias
          },
          otros: {
            estado: formData.estadoOtros,
            descripcion: formData.descripcionOtros
          },
        },
        antecedentesPersonalesPatologicos: {
          diabetes: {
            estado: formData.estadoDiabetesAntecedentes,
            descripcion: formData.descripcionDiabetesAntecedentes
          },
          nefropatias: {
            estado: formData.estadoNefropatiasAntecedentes,
            descripcion: formData.descripcionNefropatiasAntecedentes
          },
          cancer: {
            estado: formData.estadoCancerAntecedentes,
            descripcion: formData.descripcionCancerAntecedentes
          },
          alergias: {
            estado: formData.estadoAlergiasAntecedentes,
            descripcion: formData.descripcionAlergiasAntecedentes
          },
          transtornosHemorragicos: {
            estado: formData.estadoHemorragiasAntecedentes,
            descripcion: formData.descripcionHemorragiasAntecedentes
          },
          hipertension: {
            estado: formData.estadoHipertensionAntecedentes,
            descripcion: formData.descripcionHipertensionAntecedentes
          },
          tuberculosis: {
            estado: formData.estadoTuberculosisAntecedentes,
            descripcion: formData.descripcionTuberculosisAntecedentes
          },
          cardiopatias: {
            estado: formData.estadoCardiopatiasAntecedentes,
            descripcion: formData.descripcionCardiopatiasAntecedentes
          },
          toxicomanias: {
            estado: formData.estadoTaxicomaniasAntecedentes,
            descripcion: formData.descripcionTaxicomaniasAntecedentes
          },
          grupoSanguineo: {
            estado: formData.estadoSanguineoAntecedentes,
            descripcion: formData.descripcionSanguineoAntecedentes
          },
        },
        antecedentesPersonalesNoPatologicos: {
          alimentacion: formData.alimentacionAntipatologias,
          higiene: formData.higieneAntipatologias,
          convivenciaConAnimales: formData.convivenciaConAnimalesAntipatologias,
          tatuajes: formData.tatuajesAntipatologias,
          deportes: formData.deportesAntipatologias,
          vacunas: formData.vacunasAntipatologias
        },
        signosVitales: {
          TA: formData.TASignosVitales,
          glucosaCapilar: formData.glucosaCapilarSignosVitales,
          temperatura: formData.temperaturaSignosVitales,
          FC: formData.FCSignosVitales,
          FR: formData.FRSignosVitales,
          talla: formData.tallaSignosVitales,
          peso: formData.pesoSignosVitales
        },
        estudios: {
          estudiosGabinete: {
            estado: formData.estadoEstudiosGabinete,
            descripcion: formData.descripcionEstudiosGabinete,
            imagen: formData.imagenEstudiosGabinete
          },
          estudiosLaboratorio: {
            estado: formData.estadoEstudiosLaboratorio,
            descripcion: formData.descripcionEstudiosLaboratorio,
            imagen: formData.imagenEstudiosLaboratorio
          }
        },
        cavidadBucal: {
          tejidosBlandos: formData.tejidosBlandosCavidadBucal,
          tejidoOseo: formData.tejidoOseoCavidadBucal,
          ATM: formData.ATMCavidadBucal,
          dolor: {
            estado: formData.estadoDolor,
            descripcion: formData.descripcionDolor
          },
          crepitacion: {
            estado: formData.estadoCrepitacion,
            descripcion: formData.descripcionCrepitacion
          },
          subluxacion: {
            estado: formData.estadosubluxacion,
            descripcion: formData.descripcionsubluxacion
          },
          anquilosis: {
            estado: formData.estadoAnquilosis,
            descripcion: formData.descripcionAnquilosis
          },
          bruxismo: {
            estado: formData.estadoBruxismo,
            descripcion: formData.descripcionBruxismo
          },
          espasmoMuscular: {
            estado: formData.estadoEspasmoMuscular,
            descripcion: formData.descripcionEspasmoMuscular
          },
          luxacion: {
            estado: formData.estadoLuxacion,
            descripcion: formData.descripcionLuxacion
          },
          diagnostico: formData.diagnostico,
          pronostico: formData.pronostico,
          planTratamiento: formData.planTratamiento,
        },
        procedimientos: "",
        estado: "true",
      };

      const response = await actualizarHistoriaClinica(id, dataTemp);
      if (response.status === 200) {
        console.log("Datos actualizados con éxito");
        toast("Datos actualizado con exito")
      }

      console.log(dataTemp);

    } catch (e) {
      console.error('Error al actualizar la historia clínica', e);
    }
  };

  return (
    <Autenticate>
      <Container titulo="Editar Registro">
        <div>
          <div>
            <h1 className="textoCentrado">Historia Clínica Estomatológica</h1>
            <div>
              <div className="textoCentrado">
                <label htmlFor="unidadMedica">
                  Unidad Médica: Consultorio Dental RH
                </label>
                <br />
                <label htmlFor="servicio">
                  Dirección: Calle 2 de Abril No. 5, Col. Centro, San Juan del
                  Río, Qro.
                </label>
                <br />
                <label htmlFor="estomatologo">
                  Estomatólogo: Sandra Angeles Ramírez
                </label>
                <br />
                <label htmlFor="cedula">Cédula profesional: 2926159</label>
                <br />
                <label htmlFor="tel1">Teléfono: 4272729318</label>
                <br />
              </div>
            </div>
            <div >
              <SharedStateContext.Provider value={{ formData, setFormData }}>
                <div className="container justify-content-center">
                  <div className="d-flex justify-content-center">
                    <MultiStep
                      steps={steps}
                      prevButton={{
                        title: "Atrás",
                        onClick: goToPreviousStep,
                        style: {
                          background: "#fff3cd",
                          borderColor: "#ffeeba",
                          color: "#856404",
                          borderRadius: "5px",
                          padding: "10px 20px",
                          display: "float",
                          float: "left", 
                        },
                      }}
                      nextButton={{
                        title: isLastStep ? "Finalizar" : "Siguiente",
                        onClick: goToNextStep,
                        style: {
                          background: "#d1ecf1",
                          borderColor: "#bee5eb",
                          color: "#007bff",
                          borderRadius: "5px",
                          padding: "10px 20px",
                          display: "float",
                          float: "right", 
                        },
                      }}
                    />
                    
                  </div>
                  
                  <div className="button-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                      <Button variant="success" onClick={onSubmit}>
                        <FontAwesomeIcon icon={faPen} />
                        &nbsp; Editar
                      </Button>
                    </div>

                </div>
              </SharedStateContext.Provider>
            </div>
          </div>
        </div>
      </Container>
    </Autenticate>
  );
}

const InitialFormData = () => {

  const { id } = useParams(); // Obtiene el ID del paciente desde la URL

  useEffect(() => {
    cargarDatosPaciente();
  }, [id]);

  const cargarDatosPaciente = async () => {
    try {
        const response = await obtenerHistoriaClinica(id);
        console.log("ESTE ES EL RESPONSE .DATA", response.data);
    } catch (error) {
        console.error('Error al cargar los datos del paciente:', error);
    }
};

  return {
    nombrePaciente: "",
    edadPaciente: "",
    sexoPaciente: "",
    escolaridadPaciente: "",
    fechaNacimientoPaciente: "",
    expedientePaciente: "",
    emailPaciente: "",
    telefonoPaciente: "",
    motivoConsulta: "",
    padecimientoActual: "",
    padecimientosSistemticos: "",
    tomandoMedicamento: "",
    estadoDiabetes: "",
    descripcionDiabetes: "",
    estadoNefropatias: "",
    descripcionNefropatias: "",
    estadoCancer: "",
    descripcionCancer: "",
    estadoAlergias: "",
    descripcionAlergias: "",
    estadoHipertension: "",
    descripcionHipertension: "",
    estadoTuberculosis: "",
    descripcionTuberculosis: "",
    estadoCardiopatias: "",
    descripcionCardiopatias: "",
    estadoOtros: "",
    descripcionOtros: "",
    estadoDiabetesAntecedentes: "",
    descripcionDiabetesAntecedentes: "",
    estadoNefropatiasAntecedentes: "",
    descripcionNefropatiasAntecedentes: "",
    estadoCancerAntecedentes: "",
    descripcionCancerAntecedentes: "",
    estadoAlergiasAntecedentes: "",
    descripcionAlergiasAntecedentes: "",
    estadoHemorragiasAntecedentes: "",
    descripcionHemorragiasAntecedentes: "",
    estadoHipertensionAntecedentes: "",
    descripcionHipertensionAntecedentes: "",
    estadoTuberculosisAntecedentes: "",
    descripcionTuberculosisAntecedentes: "",
    estadoCardiopatiasAntecedentes: "",
    descripcionCardiopatiasAntecedentes: "",
    estadoToxicomaniasAntecedentes: "",
    descripcionToxicomaniasAntecedentes: "",
    estadoSanguineoAntecedentes: "",
    descripcionSanguineoAntecedentes: "",
    alimentacionAntipatologias: "",
    higieneAntipatologias: "",
    convivenciaConAnimalesAntipatologias: "",
    tatuajesAntipatologias: "",
    deportesAntipatologias: "",
    vacunasAntipatologias: "",
    TASignosVitales: "",
    glucosaCapilarSignosVitales: "",
    temperaturaSignosVitales: "",
    FCSignosVitales: "",
    FRSignosVitales: "",
    tallaSignosVitales: "",
    pesoSignosVitales: "",
    estadoEstudiosGabinete: "",
    descripcionEstudiosGabinete: "",
    imagenEstudiosGabinete: "",
    estadoEstudiosLaboratorio: "",
    descripcionEstudiosLaboratorio: "",
    imagenEstudiosLaboratorio: "",
    tejidosBlandosCavidadBucal: "",
    tejidoOseoCavidadBucal: "",
    ATMCavidadBucal: "",
    estadoDolor: "",
    descripcionDolor: "",
    estadoCrepitacion: "",
    descripcionCrepitacion: "",
    estadosubluxacion: "",
    descripcionsubluxacion: "",
    estadoAnquilosis: "",
    descripcionAnquilosis: "",
    estadoBruxismo: "",
    descripcionBruxismo: "",
    estadoEspasmoMuscular: "",
    descripcionEspasmoMuscular: "",
    estadoLuxacion: "",
    descripcionLuxacion: "",
    diagnostico: "",
    pronostico: "",
    planTratamiento: "",
    procedimientos: []
  }
}

export default EditarHistoriaClinica;
