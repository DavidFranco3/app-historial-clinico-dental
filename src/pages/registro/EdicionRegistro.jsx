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
import html2canvas from "html2canvas";
import { subeArchivosCloudinary } from "../../api/cloudinary";
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
  { component: <StepTen /> }
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
                <Form.Control name="datosPaciente.nombre" defaultValue={formData?.datosPaciente?.nombre } onChange={onChange} type="text" />
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
                      name="datosPaciente.sexo"
                      label="Masculino"
                      value="Masculino"
                      checked={formData?.datosPaciente?.sexo === "Masculino"}
                      onChange={onChange}
                      inline
                    />
                    <Form.Check
                      type="radio"
                      name="datosPaciente.sexo"
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
                <Form.Control
                  name="datosPaciente.fechaNacimiento"
                  defaultValue={formData?.datosPaciente?.fechaNacimiento}
                  type="date"
                />
              </div>
            </Col>
          </Row>


          {/*EXPEDIENTE Y ESCOLARIDAD*/}
          <Row className="justify-content-center mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={4} lg={4}>
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Expediente:</Form.Label>
                <Form.Control
                  name="datosPaciente.expediente"
                  defaultValue={formData?.datosPaciente?.expediente}
                  type="text"
                />
              </div>
            </Col>
            <Col sm={12} md={4} lg={4}>
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Escolaridad:</Form.Label>
                <Form.Control
                  name="datosPaciente.escolaridad"
                  defaultValue={formData?.datosPaciente?.escolaridad}
                  type="text"
                />
              </div>
            </Col>
          </Row>

          {/*TELEFONO*/}
          <Row className="justify-content-center mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={4} lg={4}>
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Teléfono particular o celular:</Form.Label>
                <Form.Control
                  name="datosPaciente.telefono"
                  defaultValue={formData?.datosPaciente?.telefono}
                  type="tel" />
              </div>
            </Col>
            <Col sm={12} md={4} lg={4}>
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Correo electronico:</Form.Label>
                <Form.Control
                  name="datosPaciente.email"
                  defaultValue={formData?.datosPaciente?.email || ''}
                  onChange={onChange}
                  type="email"
                />
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
  const { odontogramaFinal, setOdontogramaFinal } = useContext(SharedStateContext);
  console.log(formData)
  
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
                  name="interrogatorio.motivoConsulta"
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
                  name="interrogatorio.padecimientoActual"
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
                  name="interrogatorio.padecimientosSistemticos"
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
                        type="radio"
                        name="interrogatorio.tomandoMedicamento"
                        label="No"
                        value="No"
                        checked={formData?.interrogatorio?.tomandoMedicamento === "No"}
                        onChange={onChange}
                        inline
                      />
                      <Form.Check
                        type="radio"
                        name="interrogatorio.tomandoMedicamento"
                        label="Si"
                        value="Si"
                        checked={formData?.interrogatorio?.tomandoMedicamento === "Si"}
                        onChange={onChange}
                        inline
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
    const [mainCategory, subCategory, property] = name.split('.');
  
    setFormData(prev => {
      // Copia del estado anterior
      const newFormData = { ...prev };
  
      // Aseguramos que mainCategory y subCategory existen en el estado
      if (!newFormData[mainCategory]) {
        newFormData[mainCategory] = {};
      }
      if (!newFormData[mainCategory][subCategory]) {
        newFormData[mainCategory][subCategory] = {};
      }
  
      // Asignamos el valor dependiendo si es checkbox o no
      newFormData[mainCategory][subCategory][property] = type === 'checkbox' ? (checked ? "Si" : "No") : value;
  
      return newFormData;
    });
  };

  return (
    <div>
      <h2 className="titulosMultiStep">Antecedentes Heredofamiliares</h2>
      <hr />
      <div>
        <Form>

          {/*DIABETES E HIPERTENSIÓN*/}
          <Row className="justify-content-center mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
              <Form.Check
                type="checkbox"
                label="Diabetes"
                name="antecedentesHeredofamiliares.diabetes.estado"
                checked={formData?.antecedentesHeredofamiliares?.diabetes?.estado === "Si"}
                onChange={onChange}
              />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="antecedentesHeredofamiliares.diabetes.descripcion"
                  value={formData?.antecedentesHeredofamiliares?.diabetes?.descripcion || ''}
                  onChange={onChange}
                />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  type="checkbox"
                  label="Hipertensión"
                  name="antecedentesHeredofamiliares.hipertension.estado"
                  checked={formData?.antecedentesHeredofamiliares?.hipertension?.estado === "Si"}
                  onChange={onChange}
                />

                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="antecedentesHeredofamiliares.hipertension.descripcion"
                  value={formData?.antecedentesHeredofamiliares?.hipertension?.descripcion || ''}
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
                  name="antecedentesHeredofamiliares.nefropatias.estado"
                  checked={formData?.antecedentesHeredofamiliares?.nefropatias?.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="antecedentesHeredofamiliares.nefropatias.descripcion"
                  value={formData?.antecedentesHeredofamiliares?.nefropatias?.descripcion || ''}
                  onChange={onChange}
                />

              </div>

            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  type="checkbox"
                  label="Tuberculosis"
                  name="antecedentesHeredofamiliares.tuberculosis.estado"
                  checked={formData?.antecedentesHeredofamiliares?.tuberculosis?.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="antecedentesHeredofamiliares.tuberculosis.descripcion"
                  value={formData?.antecedentesHeredofamiliares?.tuberculosis?.descripcion || ''}
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
                  name="antecedentesHeredofamiliares.cancer.estado"
                  checked={formData?.antecedentesHeredofamiliares?.cancer?.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="antecedentesHeredofamiliares.cancer.descripcion"
                  value={formData?.antecedentesHeredofamiliares?.cancer?.descripcion || ''}
                  onChange={onChange}
                />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  type="checkbox"
                  label="Cardiopatías"
                  name="antecedentesHeredofamiliares.cardiopatias.estado"
                  checked={formData?.antecedentesHeredofamiliares?.cardiopatias?.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="antecedentesHeredofamiliares.cardiopatias.descripcion"
                  value={formData?.antecedentesHeredofamiliares?.cardiopatias?.descripcion || ''}
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
                  name="antecedentesHeredofamiliares.alergias.estado"
                  checked={formData?.antecedentesHeredofamiliares?.alergias?.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="antecedentesHeredofamiliares.alergias.descripcion"
                  value={formData?.antecedentesHeredofamiliares?.alergias?.descripcion || ''}
                  onChange={onChange}
                />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  type="checkbox"
                  label="Otros"
                  name="antecedentesHeredofamiliares.otros.estado"
                  checked={formData?.antecedentesHeredofamiliares?.otros?.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="antecedentesHeredofamiliares.otros.descripcion"
                  defaultValue={formData?.antecedentesHeredofamiliares?.otros?.descripcion || ''}
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
    const [mainCategory, subCategory, property] = name.split('.');
  
    setFormData(prev => {
      // Copia del estado anterior
      const newFormData = { ...prev };
  
      // Aseguramos que mainCategory y subCategory existen en el estado
      if (!newFormData[mainCategory]) {
        newFormData[mainCategory] = {};
      }
      if (!newFormData[mainCategory][subCategory]) {
        newFormData[mainCategory][subCategory] = {};
      }
  
      // Asignamos el valor dependiendo si es checkbox o no
      newFormData[mainCategory][subCategory][property] = type === 'checkbox' ? (checked ? "Si" : "No") : value;
  
      return newFormData;
    });
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
                  name="antecedentesPersonalesPatologicos.diabetes.estado"
                  checked={formData?.antecedentesPersonalesPatologicos?.diabetes?.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="antecedentesPersonalesPatologicos.diabetes.descripcion"
                  value={formData?.antecedentesPersonalesPatologicos?.diabetes?.descripcion}
                  onChange={onChange}
                />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  type="checkbox"
                  label="Hipertensión"
                  name="antecedentesPersonalesPatologicos.hipertension.estado"
                  checked={formData?.antecedentesPersonalesPatologicos?.hipertension?.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="antecedentesPersonalesPatologicos.hipertension.descripcion"
                  value={formData?.antecedentesPersonalesPatologicos?.hipertension?.descripcion}
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
                  name="antecedentesPersonalesPatologicos.nefropatias.estado"
                  checked={formData?.antecedentesPersonalesPatologicos?.nefropatias?.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="antecedentesPersonalesPatologicos.nefropatias.descripcion"
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
                  name="antecedentesPersonalesPatologicos.tuberculosis.estado"
                  checked={formData?.antecedentesPersonalesPatologicos?.tuberculosis?.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="antecedentesPersonalesPatologicos.tuberculosis.descripcion"
                  value={formData?.antecedentesPersonalesPatologicos?.tuberculosis?.descripcion}
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
                  name="antecedentesPersonalesPatologicos.cancer.estado"
                  checked={formData?.antecedentesPersonalesPatologicos?.cancer?.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="antecedentesPersonalesPatologicos.cancer.descripcion"
                  value={formData?.antecedentesPersonalesPatologicos?.cancer?.descripcion}
                  onChange={onChange}
                />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  type="checkbox"
                  label="Cardiopatías"
                  name="antecedentesPersonalesPatologicos.cardiopatias.estado"
                  checked={formData?.antecedentesPersonalesPatologicos?.cardiopatias?.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="antecedentesPersonalesPatologicos.cardiopatias.descripcion"
                  value={formData?.antecedentesPersonalesPatologicos?.cardiopatias?.descripcion}
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
                  name="antecedentesPersonalesPatologicos.alergias.estado"
                  checked={formData?.antecedentesPersonalesPatologicos?.alergias?.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="antecedentesPersonalesPatologicos.alergias.descripcion"
                  value={formData?.antecedentesPersonalesPatologicos?.alergias?.descripcion}
                  onChange={onChange}
                />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  type="checkbox"
                  label="Toxicomanias"
                  name="antecedentesPersonalesPatologicos.toxicomanias.estado"
                  checked={formData?.antecedentesPersonalesPatologicos?.toxicomanias?.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="antecedentesPersonalesPatologicos.toxicomanias.descripcion"
                  value={formData?.antecedentesPersonalesPatologicos?.toxicomanias?.descripcion}
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
                  name="antecedentesPersonalesPatologicos.grupoSanguineo.estado"
                  checked={formData?.antecedentesPersonalesPatologicos?.grupoSanguineo?.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="antecedentesPersonalesPatologicos.grupoSanguineo.descripcion"
                  value={formData?.antecedentesPersonalesPatologicos?.grupoSanguineo?.descripcion}
                  onChange={onChange}
                />
              </div>
            </Col>

            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  type="checkbox"
                  label="Hemoragias"
                  name="antecedentesPersonalesPatologicos.transtornosHemorragicos.estado"
                  checked={formData?.antecedentesPersonalesPatologicos?.transtornosHemorragicos?.estado === "Si"}
                  onChange={onChange}
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="antecedentesPersonalesPatologicos.transtornosHemorragicos.descripcion"
                  value={formData?.antecedentesPersonalesPatologicos?.transtornosHemorragicos?.descripcion}
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
    const [mainCategory, subCategory] = name.split('.');
  
    setFormData(prevFormData => ({
      ...prevFormData,
      [mainCategory]: {
        ...prevFormData[mainCategory],
        [subCategory]: checked ? "Si" : "No"
      }
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
                name="antecedentesPersonalesNoPatologicos.alimentacion"
                value="Si"
                type="checkbox"
                label={"Alimentación"}
              />
            </Col>
            <Col sm={12} md={4} lg={4} className="d-flex justify-content-center">
              <Form.Check
                checked={formData?.antecedentesPersonalesNoPatologicos?.higiene === "Si"} // Esta propiedad refleja el estado actual del checkbox
                onChange={onChange} // Añadir el onChange que maneja la actualización del estado
                name="antecedentesPersonalesNoPatologicos.higiene"
                value="Si"
                type="checkbox"
                label={"Higiene"}
              />
            </Col>
            <Col sm={12} md={4} lg={4} className="d-flex justify-content-center">
              <Form.Check
                checked={formData?.antecedentesPersonalesNoPatologicos?.convivenciaConAnimales === "Si"} // Esta propiedad refleja el estado actual del checkbox
                onChange={onChange} // Añadir el onChange que maneja la actualización del estado
                name="antecedentesPersonalesNoPatologicos.convivenciaConAnimales"
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
                name="antecedentesPersonalesNoPatologicos.tatuajes"
                value="Si"
                type="checkbox"
                label={"Tatuajes"}
              />
            </Col>
            <Col sm={12} md={4} lg={4} className="d-flex justify-content-center" >
              <Form.Check
                checked={formData?.antecedentesPersonalesNoPatologicos?.deportes === "Si"} // Esta propiedad refleja el estado actual del checkbox
                onChange={onChange} // Añadir el onChange que maneja la actualización del estado
                name="antecedentesPersonalesNoPatologicos.deportes"
                value="Si"
                type="checkbox"
                label={"Deportes"}
              />
            </Col>
            <Col sm={12} md={4} lg={4} className="d-flex justify-content-center" >
              <Form.Check
                checked={formData?.antecedentesPersonalesNoPatologicos?.vacunas === "Si"} // Esta propiedad refleja el estado actual del checkbox
                onChange={onChange} // Añadir el onChange que maneja la actualización del estado
                name="antecedentesPersonalesNoPatologicos.vacunas"
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
    const [mainCategory, subCategory] = name.split('.');
  
    setFormData(prevFormData => ({
      ...prevFormData,
      [mainCategory]: {
        ...prevFormData[mainCategory],
        [subCategory]: checked ? "Si" : "No"
      }
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
                name="signosVitales.TA"
                checked={formData?.signosVitales?.TA === "Si"}
                onChange={onChange}
                label={"TA"}
              />
            </Col>
            <Col sm={6} md={3} lg={3} className="d-flex justify-content-center">
              <Form.Check
                type="checkbox"
                name="signosVitales.temperatura"
                checked={formData?.signosVitales?.temperatura === "Si"}
                onChange={onChange}
                label={"Temperatura"}
              />
            </Col>
            <Col sm={6} md={3} lg={3} className="d-flex justify-content-center">
              <Form.Check
                type="checkbox"
                name="signosVitales.FR"
                checked={formData?.signosVitales?.FR === "Si"}
                onChange={onChange}
                label={"FR"}
              />
            </Col>
            <Col sm={6} md={3} lg={3} className="d-flex justify-content-center">
              <Form.Check
                type="checkbox"
                name="signosVitales.peso"
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
                name="signosVitales.talla"
                checked={formData?.signosVitales?.talla === "Si"}
                onChange={onChange}
                label={"Talla"}
              />
            </Col>
            <Col sm={6} md={3} lg={3} className="d-flex justify-content-center">
              <Form.Check
                type="checkbox"
                name="signosVitales.glucosaCapilar"
                checked={formData?.signosVitales?.glucosaCapilar === "Si"}
                onChange={onChange}
                label={"Glucosa Capilar"}
              />
            </Col>
            <Col sm={6} md={3} lg={3} className="d-flex justify-content-center">
              <Form.Check
                type="checkbox"
                name="signosVitales.FC"
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

  const onChange = (e) => {
    const { name, value, checked, type } = e.target;
    const [mainCategory, subCategory, property] = name.split('.');
  
    setFormData(prev => {
      // Copia del estado anterior
      const newFormData = { ...prev };
  
      // Aseguramos que mainCategory y subCategory existen en el estado
      if (!newFormData[mainCategory]) {
        newFormData[mainCategory] = {};
      }
      if (!newFormData[mainCategory][subCategory]) {
        newFormData[mainCategory][subCategory] = {};
      }
  
      // Asignamos el valor dependiendo si es checkbox o no
      newFormData[mainCategory][subCategory][property] = type === 'checkbox' ? (checked ? "Si" : "No") : value;
  
      return newFormData;
    });
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
                checked={formData?.estudios?.estudiosGabinete?.estado === "Si"}
                name="estudios.estudiosGabinete.estado"
                onChange={onChange}
                label={"Estudios de gabinete"}
              />
            </div>
            <Form.Control
              as="textarea"
              value={formData?.estudios?.estudiosGabinete?.descripcion || ''}
              name="estudios.estudiosGabinete.descripcion"
              onChange={onChange}
              placeholder="Descripción de los estudios de gabinete (Radiografías, Resonancias, etc.)"
            />
            {/* El input de tipo file no es manejado por el estado de React */}
            <Form.Control
              name="imagenEstudiosGabinete"
              type="file"
              className="mt-2"
              value={formData?.estudiosGabinete?.imagen}
            />
          </Col>
          {/* Estudios de laboratorio */}
          <Col sm={12} md={6} lg={6} className="d-flex flex-column align-items-center">
            <div className="mb-2">
              <Form.Check
                type="checkbox"
                checked={formData?.estudios?.estudiosLaboratorio?.estado === "Si"}
                name="estudios.estudiosLaboratorio.estado"
                onChange={onChange}
                label={"Estudios de Laboratorio"}
              />
            </div>
            <Form.Control
              as="textarea"
              value={formData?.estudios?.estudiosLaboratorio?.descripcion || ''}
              name="estudios.estudiosLaboratorio.descripcion"
              onChange={onChange}
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
    const [mainCategory, subCategory, property] = name.split('.');
  
    setFormData(prev => {
      // Copia del estado anterior
      const newFormData = { ...prev };
  
      // Aseguramos que mainCategory y subCategory existen en el estado
      if (!newFormData[mainCategory]) {
        newFormData[mainCategory] = {};
      }
      if (!newFormData[mainCategory][subCategory]) {
        newFormData[mainCategory][subCategory] = {};
      }
  
      // Asignamos el valor dependiendo si es checkbox o no
      newFormData[mainCategory][subCategory][property] = type === 'checkbox' ? (checked ? "Si" : "No") : value;
  
      return newFormData;
    });
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
                  name="cavidadBucal.tejidosBlandos"
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
                  name="cavidadBucal.tejidoOseo"
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
                  name="cavidadBucal.ATM"
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
                  checked={formData?.cavidadBucal?.dolor?.estado === "Si"}
                  name="cavidadBucal.dolor.estado"
                  type="checkbox"
                  label={"Dolor"}
                />
              </div>
              <Form.Control
                defaultValue={formData?.cavidadBucal?.dolor?.descripcion}
                name="cavidadBucal.dolor.descripcion"
                as="textarea"
                placeholder="Descripción del dolor"
              />
            </Col>
            <Col sm={12} md={6} lg={6} className="d-flex flex-column align-items-center">
              <div className="mb-2">
                <Form.Check
                  onChange={onChange}
                  checked={formData?.cavidadBucal?.crepitacion?.estado === "Si"}
                  name="cavidadBucal.crepitacion.estado"
                  type="checkbox"
                  label={"Crepitación"}
                />
              </div>
              <Form.Control
                defaultValue={formData?.cavidadBucal?.crepitacion?.descripcion}
                name="cavidadBucal.crepitacion.descripcion"
                as="textarea"
                placeholder="Descripción de la crepitación"
              />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6} className="d-flex flex-column align-items-center">
              <Form.Check
                onChange={onChange}
                checked={formData?.cavidadBucal?.subluxacion?.estado === "Si"}
                name="cavidadBucal.subluxacion.estado"
                type="checkbox"
                label={"Subluxación"}
              />
              <Form.Control
                defaultValue={formData?.cavidadBucal?.subluxacion?.descripcion}
                name="cavidadBucal.subluxacion.descripcion"
                as="textarea"
                placeholder="Descripción de la subluxación"
              />
            </Col>
            <Col sm={12} md={6} lg={6} className="d-flex flex-column align-items-center">
              <Form.Check
                onChange={onChange}
                checked={formData?.cavidadBucal?.anquilosis?.estado === "Si"}
                name="cavidadBucal.anquilosis.estado"
                type="checkbox"
                label={"Anquilosis"}
              />
              <Form.Control
                defaultValue={formData?.cavidadBucal?.anquilosis?.descripcion}
                name="cavidadBucal.anquilosis.descripcion"
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
                  checked={formData?.cavidadBucal?.bruxismo?.estado === "Si"}
                  name="cavidadBucal.bruxismo.estado"
                  type="checkbox"
                  label={"Bruxismo"}
                />
              </div>
              <Form.Control
                defaultValue={formData?.cavidadBucal?.bruxismo?.descripcion}
                name="cavidadBucal.bruxismo.descripcion"
                as="textarea"
                placeholder="Descripción del bruxismo"
              />
            </Col>
            <Col sm={12} md={6} lg={6} className="d-flex flex-column align-items-center">
              <div className="mb-2">
                <Form.Check
                  onChange={onChange}
                  checked={formData?.cavidadBucal?.espasmoMuscular?.estado === "Si"}
                  name="cavidadBucal.espasmoMuscular.estado"
                  type="checkbox"
                  label={"Espasmo muscular"}
                />
              </div>
              <Form.Control
                defaultValue={formData?.cavidadBucal?.espasmoMuscular?.descripcion}
                name="cavidadBucal.espasmoMuscular.descripcion"
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
                  checked={formData?.cavidadBucal?.luxacion?.estado === "Si"}
                  name="cavidadBucal.luxacion.estado"
                  type="checkbox"
                  label={"Luxación"}
                />
              </div>
              <Form.Control
                defaultValue={formData?.cavidadBucal?.luxacion?.descripcion}
                name="cavidadBucal.luxacion.descripcion"
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
                <Form.Control
                  defaultValue={formData?.cavidadBucal?.diagnostico}
                  name="cavidadBucal.diagnostico"
                  as="textarea"
                  placeholder="Diagnóstico"
                />
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
                <Form.Control
                  defaultValue={formData?.cavidadBucal?.pronostico}
                  name="cavidadBucal.pronostico"
                  as="textarea"
                  placeholder="Pronóstico"
                />
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
                <Form.Control
                  defaultValue={formData?.cavidadBucal?.planTratamiento}
                  name="cavidadBucal.planTratamiento"
                  as="textarea"
                  placeholder="Plan de tratamiento"
                />
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

  const { formData, setFormData } = useContext(SharedStateContext)

  const [procedimientos, setProcedimientos] = useState([]);

  const eliminarProcedimiento = (index) => {
    const updatedProcedimientos = formData.procedimientos.filter((_, i) => i !== index);
    setFormData({ ...formData, procedimientos: updatedProcedimientos });
  };

  const anadirProcedimiento = (nuevoProcedimiento) => {
    const updatedProcedimientos = [...formData.procedimientos, nuevoProcedimiento];
    setFormData({ ...formData, procedimientos: updatedProcedimientos });
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

      <h2 className="titulosMultiStep">
        Odontograma incial y procedimientos
      </h2>

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
                  setShowModal={setShowModal}
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

function StepTen() {
  const [identificador, setIdentificador] = useState("");

  const { formData, setFormData } = useContext(SharedStateContext)
  const { odontogramaFinal, setOdontogramaFinal } = useContext(SharedStateContext);


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

  const capturarPantalla = () => {
    return new Promise((resolve, reject) => {
      const elemento = document.getElementById("divFigFinal");

      html2canvas(elemento, { useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        cargarImagen1(imgData).then(() => {
          resolve(); // Resuelve la promesa después de cargar la imagen
        });
      });
    });
  };

  const cargarImagen1 = (imgData) => {
    console.log(imgData)
    return new Promise((resolve, reject) => {
      try {
        subeArchivosCloudinary(imgData, "odontogramas")
          .then((response) => {
            console.log(response)
            setOdontogramaFinal(response);
            resolve(response); // Resuelve la promesa después de establecer el enlace de la imagen
          })
          .catch((e) => {
            console.log(e);
            reject(e); // Rechaza la promesa si hay un error
          });
      } catch (e) {
        console.log(e);
        reject(e); // Rechaza la promesa si hay un error
      }
    });
  };

  useEffect(() => {
    if (odontogramaFinal) {
      setFormData(prevFormData => ({
        ...prevFormData, 
        odontogramaFinal: odontogramaFinal
      }));
    }
  }, [odontogramaFinal]);

  const ejecutarCapturaEImagen = async () => {
    try {
      await capturarPantalla();
      console.log("Enlace de la imagen: " + odontogramaFinal); // Mover el console.log aquí
    } catch (error) {
      console.error("Error al capturar o cargar la imagen:", error);
    }
  };

  async function ejecutarCapturasYMostrarLogs() {
      try {
        await Promise.all([
          ejecutarCapturaEImagen(),
        ]);
      } catch (error) {
        console.error("Error en ejecutarCapturasYMostrarLogs:", error);
      }
  }

  return (
    <div>

      <div>
        <h2 className="titulosMultiStep">
          Odontograma final
        </h2>
      </div>

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
      <div id="divFigFinal" className="divFig">
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
      <button onClick={ejecutarCapturasYMostrarLogs}>Capture Image</button>
        {/* ESPACIO EN BLANCO */}
        <div className="container mt-5">
        
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
    procedimientos: [],
    odontograma: "",
    odontogramaFinal: ""
  })

  const [ odontogramaFinal, setOdontogramaFinal ] = useState("");

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
          procedimientos: response.data.procedimientos || [],
          odontograma: response.data.odontograma || "",
          odontogramaFinal: response.data.odontogramaFinal || ""
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
          nombre: formData?.datosPaciente?.nombre,
          edad: formData?.datosPaciente?.edad,
          sexo: formData?.datosPaciente?.sexo,
          escolaridad: formData?.datosPaciente?.escolaridad,
          fechaNacimiento: formData?.datosPaciente?.fechaNacimiento,
          expediente: formData?.datosPaciente?.expediente,
          email: formData?.datosPaciente?.email,
          telefono: formData?.datosPaciente?.telefono,
        },
        interrogatorio: {
          motivoConsulta: formData?.interrogatorio?.motivoConsulta,
          padecimientoActual: formData?.interrogatorio?.padecimientoActual,
          padecimientosSistemticos: formData?.interrogatorio?.padecimientosSistemticos,
          tomandoMedicamento: formData?.interrogatorio?.tomandoMedicamento,
        },
        antecedentesHeredofamiliares: {
          diabetes: {
            estado: formData?.antecedentesHeredofamiliares?.diabetes?.estado,
            descripcion: formData?.antecedentesHeredofamiliares?.diabetes?.descripcion
          },
          nefropatias: {
            estado: formData?.antecedentesHeredofamiliares?.nefropatias?.estado,
            descripcion: formData?.antecedentesHeredofamiliares?.nefropatias?.descripcion
          },
          cancer: {
            estado: formData?.antecedentesHeredofamiliares?.cancer?.estado,
            descripcion: formData?.antecedentesHeredofamiliares?.cancer?.descripcion
          },
          alergias: {
            estado: formData?.antecedentesHeredofamiliares?.alergias?.estado,
            descripcion: formData?.antecedentesHeredofamiliares?.alergias?.descripcion
          },
          hipertension: {
            estado: formData?.antecedentesHeredofamiliares?.hipertension?.estado,
            descripcion: formData?.antecedentesHeredofamiliares?.hipertension?.descripcion
          },
          tuberculosis: {
            estado: formData?.antecedentesHeredofamiliares?.tuberculosis?.estado,
            descripcion: formData?.antecedentesHeredofamiliares?.tuberculosis?.descripcion
          },
          cardiopatias: {
            estado: formData?.antecedentesHeredofamiliares?.cardiopatias?.estado,
            descripcion: formData?.antecedentesHeredofamiliares?.cardiopatias?.descripcion
          },
          otros: {
            estado: formData?.antecedentesHeredofamiliares?.otros?.estado,
            descripcion: formData?.antecedentesHeredofamiliares?.otros?.descripcion
          },
        },
        antecedentesPersonalesPatologicos: {
          diabetes: {
            estado: formData?.antecedentesPersonalesPatologicos?.diabetes?.estado,
            descripcion: formData?.antecedentesPersonalesPatologicos?.diabetes?.descripcion
          },
          nefropatias: {
            estado: formData?.antecedentesPersonalesPatologicos?.nefropatias?.estado,
            descripcion: formData?.antecedentesPersonalesPatologicos?.nefropatias?.descripcion
          },
          cancer: {
            estado: formData?.antecedentesPersonalesPatologicos?.cancer?.estado,
            descripcion: formData?.antecedentesPersonalesPatologicos?.cancer?.descripcion
          },
          alergias: {
            estado: formData?.antecedentesPersonalesPatologicos?.alergias?.estado,
            descripcion: formData?.antecedentesPersonalesPatologicos?.alergias?.descripcion
          },
          transtornosHemorragicos: {
            estado: formData?.antecedentesPersonalesPatologicos?.transtornosHemorragicos?.estado,
            descripcion: formData?.antecedentesPersonalesPatologicos?.transtornosHemorragicos?.descripcion
          },
          hipertension: {
            estado: formData?.antecedentesPersonalesPatologicos?.hipertension?.estado,
            descripcion: formData?.antecedentesPersonalesPatologicos?.hipertension?.descripcion
          },
          tuberculosis: {
            estado: formData?.antecedentesPersonalesPatologicos?.tuberculosis?.estado,
            descripcion: formData?.antecedentesPersonalesPatologicos?.tuberculosis?.descripcion
          },
          cardiopatias: {
            estado: formData?.antecedentesPersonalesPatologicos?.cardiopatias?.estado,
            descripcion: formData?.antecedentesPersonalesPatologicos?.cardiopatias?.descripcion
          },
          toxicomanias: {
            estado: formData?.antecedentesPersonalesPatologicos?.toxicomanias?.estado,
            descripcion: formData?.antecedentesPersonalesPatologicos?.toxicomanias?.descripcion
          },
          grupoSanguineo: {
            estado: formData?.antecedentesPersonalesPatologicos?.grupoSanguineo?.estado,
            descripcion: formData?.antecedentesPersonalesPatologicos?.grupoSanguineo?.descripcion
          },
        },
        antecedentesPersonalesNoPatologicos: {
          alimentacion: formData?.antecedentesPersonalesNoPatologicos?.alimentacion,
          higiene: formData?.antecedentesPersonalesNoPatologicos?.higiene,
          convivenciaConAnimales: formData?.antecedentesPersonalesNoPatologicos?.convivenciaConAnimales,
          tatuajes: formData?.antecedentesPersonalesNoPatologicos?.tatuajes,
          deportes: formData?.antecedentesPersonalesNoPatologicos?.deportes,
          vacunas: formData?.antecedentesPersonalesNoPatologicos?.vacunas
        },
        signosVitales: {
          TA: formData?.signosVitales?.TA,
          glucosaCapilar: formData?.signosVitales?.glucosaCapilar,
          temperatura: formData?.signosVitales?.temperatura,
          FC: formData?.signosVitales?.FC,
          FR: formData?.signosVitales?.FR,
          talla: formData?.signosVitales?.talla,
          peso: formData?.signosVitales?.peso
        },
        estudios: {
          estudiosGabinete: {
            estado: formData?.estudios?.estudiosGabinete?.estado,
            descripcion: formData?.estudios?.estudiosGabinete?.descripcion,
            imagen: formData?.estudios?.estudiosGabinete?.imagen
          },
          estudiosLaboratorio: {
            estado: formData?.estudios?.estudiosLaboratorio?.estado,
            descripcion: formData?.estudios?.estudiosLaboratorio?.descripcion,
            imagen: formData?.estudios?.estudiosLaboratorio?.imagen
          }
        },
        cavidadBucal: {
          tejidosBlandos: formData?.cavidadBucal?.tejidosBlandos,
          tejidoOseo: formData?.cavidadBucal?.tejidoOseo,
          ATM: formData?.cavidadBucal?.ATM,
          dolor: {
            estado: formData?.cavidadBucal?.dolor?.estado,
            descripcion: formData?.cavidadBucal?.dolor?.descripcion
          },
          crepitacion: {
            estado: formData?.cavidadBucal?.crepitacion?.estado,
            descripcion: formData?.cavidadBucal?.crepitacion?.descripcion
          },
          subluxacion: {
            estado: formData?.cavidadBucal?.subluxacion?.estado,
            descripcion: formData?.cavidadBucal?.subluxacion?.descripcion
          },
          anquilosis: {
            estado: formData?.cavidadBucal?.anquilosis?.estado,
            descripcion: formData?.cavidadBucal?.anquilosis?.descripcion
          },
          bruxismo: {
            estado: formData?.cavidadBucal?.bruxismo?.estado,
            descripcion: formData?.cavidadBucal?.bruxismo?.descripcion
          },
          espasmoMuscular: {
            estado: formData?.cavidadBucal?.espasmoMuscular?.estado,
            descripcion: formData?.cavidadBucal?.espasmoMuscular?.descripcion
          },
          luxacion: {
            estado: formData?.cavidadBucal?.luxacion?.estado,
            descripcion: formData?.cavidadBucal?.luxacion?.descripcion
          },
          diagnostico: formData?.cavidadBucal?.diagnostico,
          pronostico: formData?.cavidadBucal?.pronostico,
          planTratamiento: formData?.cavidadBucal?.planTratamiento,
        },
        procedimientos: formData?.procedimientos,
        odontograma: formData?.odontograma,
        odontogramaFinal: formData?.odontogramaFinal,
        estado: "true",
      };

      const response = await actualizarHistoriaClinica(id, dataTemp);
      console.log(dataTemp);

      if (response.status === 200) {
        console.log("Datos actualizados con éxito");
        toast("Datos actualizado con exito")
      }

      console.log(dataTemp);

    } catch (e) {
      console.error('Error al actualizar la historia clínica', e);
    }
  };

  console.log(formData)

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
              <SharedStateContext.Provider value={{ formData, setFormData, odontogramaFinal, setOdontogramaFinal}}>
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

export default EditarHistoriaClinica;
