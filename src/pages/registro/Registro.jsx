import { useEffect, useState, useContext, createContext, useRef } from "react";
import Dropzone from "../../components/dropzone/Dropzone";
import Autenticate from "../../layout/Autenticate";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
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
import { registraHistoriaClinica } from "../../api/historiaClinica";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { height, width } from "@fortawesome/free-solid-svg-icons/fa0";
import { text } from "@fortawesome/fontawesome-svg-core";
import BasicModal from "../../components/Modal/BasicModal";
import RegistroProcedimiento from "./AnadirRegistro";
import { toast } from "react-toastify";
import { subeArchivosCloudinary } from "../../api/cloudinary";
import html2canvas from "html2canvas";
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
  { component: <StepTen /> },
];

function StepOne() {
  // Para almacenar los datos del formulario
  const { formData, setFormData } = useContext(SharedStateContext);
  const { odontograma, setOdontograma } = useContext(SharedStateContext);

  console.log(formData)

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    const dataPath = name.split('.');
    const lastKey = dataPath.pop();

    setFormData((prev) => {
      let ref = prev;
      for (let key of dataPath) {
        if (!ref[key]) ref[key] = {};
        ref = ref[key];
      }
      // Actualiza el estado para checkboxes y radios de manera adecuada
      if (type === 'checkbox') {
        ref[lastKey] = checked;
      } else {
        ref[lastKey] = value;
      }
      return { ...prev };
    });
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
                <Form.Control
                  name="datosPaciente.nombre"
                  defaultValue={formData.datosPaciente.nombre}
                  type="text"
                />
              </div>
            </Col>
            <Col sm={12} md={4} lg={4}>
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Edad (Años):</Form.Label>
                <Form.Control
                  name="datosPaciente.edad"
                  defaultValue={formData.datosPaciente.edad}
                  type="number"
                />
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
                      value="Masculino"
                      checked={formData.datosPaciente.sexo === "Masculino"}
                      name="datosPaciente.sexo"
                      id="datosPaciente.sexo"
                      defaultValue={formData.datosPaciente.sexo}
                      label={"Masculino"}
                      inline
                    />
                    <Form.Check
                      type="radio"
                      value="Femenino"
                      checked={formData.datosPaciente.sexo === "Femenino"}
                      name="datosPaciente.sexo"
                      id="datosPaciente.sexo"
                      defaultValue={formData.datosPaciente.sexo}
                      label={"Femenino"}
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
                  defaultValue={formData.datosPaciente.fechaNacimiento}
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
                  defaultValue={formData.datosPaciente.expediente}
                  type="text"
                />
              </div>
            </Col>
            <Col sm={12} md={4} lg={4}>
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Escolaridad:</Form.Label>
                <Form.Control
                  name="datosPaciente.escolaridad"
                  defaultValue={formData.datosPaciente.escolaridad}
                  type="email"
                />
              </div>
            </Col>
          </Row>

          {/*TELEFONO Y EMAIL*/}
          <Row className="justify-content-center mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={4} lg={4}>
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Teléfono particular o celular:</Form.Label>
                <Form.Control
                  name="datosPaciente.telefono"
                  defaultValue={formData.datosPaciente.telefono}
                  type="tel"
                />
              </div>
            </Col>
            <Col sm={12} md={4} lg={4}>
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Correo electrónico:</Form.Label>
                <Form.Control
                  name="datosPaciente.email"
                  defaultValue={formData.datosPaciente.email}
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
  console.log(formData)

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    const dataPath = name.split('.');
    const lastKey = dataPath.pop();

    setFormData((prev) => {
      let ref = prev;
      for (let key of dataPath) {
        if (!ref[key]) ref[key] = {};
        ref = ref[key];
      }
      // Actualiza el estado para checkboxes y radios de manera adecuada
      if (type === 'checkbox') {
        ref[lastKey] = checked;
      } else {
        ref[lastKey] = value;
      }
      return { ...prev };
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
                  defaultValue={formData.interrogatorio.motivoConsulta}
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
                  defaultValue={formData.interrogatorio.padecimientoActual}
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
                  defaultValue={formData.interrogatorio.padecimientosSistemticos}
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
                      defaultValue={formData.interrogatorio.tomandoMedicamento}
                      label={"No"}
                      inline
                      value="No" // Valor asociado al radio button
                      checked={formData.interrogatorio.tomandoMedicamento === "No"} // Verificar si este radio button está seleccionado
                    />
                    <Form.Check
                      type="radio"
                      name="interrogatorio.tomandoMedicamento"
                      defaultValue={formData.interrogatorio.tomandoMedicamento}
                      label={"Sí"}
                      inline
                      value="Si"
                      checked={formData.interrogatorio.tomandoMedicamento === "Si"}
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

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    const dataPath = name.split('.');
    const lastKey = dataPath.pop();

    setFormData((prev) => {
      let ref = prev;
      for (let key of dataPath) {
        if (!ref[key]) ref[key] = {};
        ref = ref[key];
      }
      if (type === 'checkbox') {
        // Asigna 'Si' si está marcado, 'No' si no está marcado
        ref[lastKey] = checked ? 'Si' : 'No';
      } else {
        ref[lastKey] = value;
      }
      return { ...prev };
    });
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
                  label={"Diabetes"}
                  name="antecedentesHeredofamiliares.diabetes.estado"
                  defaultValue={formData.antecedentesHeredofamiliares.diabetes.estado}
                  value="Si"
                  onChange={onChange}
                />
                <Form.Control
                  name="antecedentesHeredofamiliares.diabetes.descripcion"
                  defaultValue={formData.antecedentesHeredofamiliares.diabetes.descripcion}
                  as="textarea"
                  placeholder="Añade descripción"
                />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  name="antecedentesHeredofamiliares.hipertension.estado"
                  defaultValue={formData.antecedentesHeredofamiliares.hipertension.estado}
                  value="Si"
                  type="checkbox"
                  label={"Hipertensión"}
                />
                <Form.Control name="antecedentesHeredofamiliares.hipertension.descripcion" defaultValue={formData.antecedentesHeredofamiliares.hipertension.descripcion} as="textarea" placeholder="Añade descripción" />
              </div>
            </Col>
          </Row>


          {/*NEFROPATÍAS Y TUBERCULOSIS*/}
          <Row className=" justify-content-center mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  name="antecedentesHeredofamiliares.nefropatias.estado"
                  defaultValue={formData.antecedentesHeredofamiliares.nefropatias.estado}
                  value="Si"
                  type="checkbox"
                  label={"Nefropatías"}
                />
                <Form.Control defaultValue={formData.antecedentesHeredofamiliares.nefropatias.descripcion} name="antecedentesHeredofamiliares.nefropatias.descripcion" as="textarea" placeholder="Añade descripción" />
              </div>

            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  name="antecedentesHeredofamiliares.tuberculosis.estado"
                  defaultValue={formData.antecedentesHeredofamiliares.tuberculosis.estado}
                  value="Si"
                  type="checkbox"
                  label={"Tuberculosis"}
                />
                <Form.Control defaultValue={formData.antecedentesHeredofamiliares.tuberculosis.descripcion} name="antecedentesHeredofamiliares.tuberculosis.descripcion" as="textarea" placeholder="Añade descripción" />
              </div>
            </Col>
          </Row>

          {/*CANCER Y CARDIPATÍAS*/}
          <Row className="justify-content-center mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  type="checkbox"
                  label={"Cáncer"}
                  value="Si"
                  defaultValue={formData.antecedentesHeredofamiliares.cancer.estado}
                  name="antecedentesHeredofamiliares.cancer.estado"
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="antecedentesHeredofamiliares.cancer.descripcion"
                  defaultValue={formData.antecedentesHeredofamiliares.cancer.descripcion}
                />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  value="Si"
                  defaultValue={formData.antecedentesHeredofamiliares.cardiopatias.estado}
                  name="antecedentesHeredofamiliares.cardiopatias.estado"
                  type="checkbox"
                  label={"Cardiopatías"}
                />
                <Form.Control defaultValue={formData.antecedentesHeredofamiliares.cardiopatias.descripcion} name="antecedentesHeredofamiliares.cardiopatias.descripcion" as="textarea" placeholder="Añade descripción" />
              </div>
            </Col>
          </Row>

          {/*ALERGÍAS Y OTROS*/}
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  type="checkbox"
                  defaultValue={formData.antecedentesHeredofamiliares.alergias.estado}
                  name="antecedentesHeredofamiliares.alergias.estado"
                  value="Si"
                  label={"Alergias"}
                />
                <Form.Control defaultValue={formData.antecedentesHeredofamiliares.alergias.descripcion} name="antecedentesHeredofamiliares.alergias.descripcion" as="textarea" placeholder="Añade descripción" />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  type="checkbox"
                  label={"Otros"}
                  defaultValue={formData.antecedentesHeredofamiliares.otros.estado}
                  name="antecedentesHeredofamiliares.otros.estado"
                  value="Si"
                />
                <Form.Control name="antecedentesHeredofamiliares.otros.descripcion" defaultValue={formData.antecedentesHeredofamiliares.otros.descripcion} as="textarea" placeholder="Añade descripción" />
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
    const { name, value, type, checked } = e.target;
    const dataPath = name.split('.');
    const lastKey = dataPath.pop();

    setFormData((prev) => {
      let ref = prev;
      for (let key of dataPath) {
        if (!ref[key]) ref[key] = {};
        ref = ref[key];
      }
      if (type === 'checkbox') {
        // Asigna 'Si' si está marcado, 'No' si no está marcado
        ref[lastKey] = checked ? 'Si' : 'No';
      } else {
        ref[lastKey] = value;
      }
      return { ...prev };
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
                  label={"Diabetes"}
                  value="Si"
                  name="antecedentesPersonalesPatologicos.diabetes.estado"
                  defaultValue={formData.antecedentesPersonalesPatologicos.diabetes.estado}
                />
                <Form.Control
                  defaultValue={formData.antecedentesPersonalesPatologicos.diabetes.descripcion}
                  name="antecedentesPersonalesPatologicos.diabetes.descripcion"
                  as="textarea"
                  placeholder="Añade descripción"
                />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  type="checkbox"
                  label={"Hipertensión"}
                  value="Si"
                  defaultValue={formData.antecedentesPersonalesPatologicos.hipertension.estado}
                  name="antecedentesPersonalesPatologicos.hipertension.estado"
                />
                <Form.Control
                  defaultValue={formData.antecedentesPersonalesPatologicos.hipertension.descripcion}
                  name="antecedentesPersonalesPatologicos.hipertension.descripcion"
                  as="textarea"
                  placeholder="Añade descripción"
                />
              </div>
            </Col>
          </Row>

          {/*NEFROPATÍAS Y TUBERCULOSIS*/}
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  value="Si"
                  defaultValue={formData.antecedentesPersonalesPatologicos.nefropatias.estado}
                  name="antecedentesPersonalesPatologicos.nefropatias.estado"
                  type="checkbox"
                  label={"Nefropatías"}
                />
                <Form.Control defaultValue={formData.antecedentesPersonalesPatologicos.nefropatias.descripcion} name="antecedentesPersonalesPatologicos.nefropatias.descripcion" as="textarea" placeholder="Añade descripción" />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  value="Si"
                  defaultValue={formData.antecedentesPersonalesPatologicos.tuberculosis.estado}
                  name="antecedentesPersonalesPatologicos.tuberculosis.estado"
                  type="checkbox"
                  label={"Tuberculosis"}
                />
                <Form.Control name="antecedentesPersonalesPatologicos.tuberculosis.descripcion" defaultValue={formData.antecedentesPersonalesPatologicos.tuberculosis.descripcion} as="textarea" placeholder="Añade descripción" />
              </div>
            </Col>
          </Row>

          {/*CANCER Y CARDIPATÍAS*/}
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  type="checkbox"
                  label={"Cáncer"}
                  value="Si"
                  defaultValue={formData.antecedentesPersonalesPatologicos.cancer.estado}
                  name="antecedentesPersonalesPatologicos.cancer.estado"
                />
                <Form.Control name="antecedentesPersonalesPatologicos.cancer.descripcion" defaultValue={formData.antecedentesPersonalesPatologicos.cancer.descripcion} as="textarea" placeholder="Añade descripción" />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  value="Si"
                  defaultValue={formData.antecedentesPersonalesPatologicos.cardiopatias.estado}
                  name="antecedentesPersonalesPatologicos.cardiopatias.estado"
                  type="checkbox"
                  label={"Cardiopatías"}
                />
                <Form.Control name="antecedentesPersonalesPatologicos.cardiopatias.descripcion" defaultValue={formData.antecedentesPersonalesPatologicos.cardiopatias.descripcion} as="textarea" placeholder="Añade descripción" />
              </div>
            </Col>
          </Row>


          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  defaultValue={formData.antecedentesPersonalesPatologicos.alergias.estado}
                  name="antecedentesPersonalesPatologicos.alergias.estado"
                  value="Si"
                  type="checkbox"
                  label={"Alergias"}
                />
                <Form.Control
                  name="antecedentesPersonalesPatologicos.alergias.descripcion"
                  defaultValue={formData.antecedentesPersonalesPatologicos.alergias.descripcion}
                  as="textarea"
                  placeholder="Añade descripción"
                />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  defaultValue={formData.antecedentesPersonalesPatologicos.toxicomanias.estado}
                  name="antecedentesPersonalesPatologicos.toxicomanias.estado"
                  value="Si"
                  type="checkbox"
                  label={"Toxicomanias"}
                />
                <Form.Control
                  name="antecedentesPersonalesPatologicos.toxicomanias.descripcion"
                  defaultValue={formData.antecedentesPersonalesPatologicos.toxicomanias.descripcion}
                  as="textarea"
                  placeholder="Añade descripción"
                />
              </div>
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  defaultValue={formData.antecedentesPersonalesPatologicos.grupoSanguineo.estado}
                  name="antecedentesPersonalesPatologicos.grupoSanguineo.estado"
                  value="Si"
                  type="checkbox"
                  label={"Sanguineo"}
                />
                <Form.Control
                  name="antecedentesPersonalesPatologicos.grupoSanguineo.descripcion"
                  defaultValue={formData.antecedentesPersonalesPatologicos.grupoSanguineo.descripcion}
                  as="textarea"
                  placeholder="Añade descripción"
                />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  defaultValue={formData.antecedentesPersonalesPatologicos.transtornosHemorragicos.estado}
                  name="antecedentesPersonalesPatologicos.transtornosHemorragicos.estado"
                  value="Si"
                  type="checkbox"
                  label={"Hemorragias"}
                />
                <Form.Control
                  name="antecedentesPersonalesPatologicos.transtornosHemorragicos.descripcion"
                  defaultValue={formData.antecedentesPersonalesPatologicos.transtornosHemorragicos.descripcion}
                  as="textarea"
                  placeholder="Añade descripción"
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

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    const dataPath = name.split('.');
    const lastKey = dataPath.pop();

    setFormData((prev) => {
      let ref = prev;
      for (let key of dataPath) {
        if (!ref[key]) ref[key] = {};
        ref = ref[key];
      }
      if (type === 'checkbox') {
        // Asigna 'Si' si está marcado, 'No' si no está marcado
        ref[lastKey] = checked ? 'Si' : 'No';
      } else {
        ref[lastKey] = value;
      }
      return { ...prev };
    });
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
                defaultValue={formData.antecedentesPersonalesNoPatologicos.alimentacion}
                name="antecedentesPersonalesNoPatologicos.alimentacion"
                value="Si"
                type="checkbox"
                label={"Alimentación"}
              />
            </Col>
            <Col sm={12} md={4} lg={4} className="d-flex justify-content-center">
              <Form.Check
                type="checkbox"
                defaultValue={formData.antecedentesPersonalesNoPatologicos.higiene}
                name="antecedentesPersonalesNoPatologicos.higiene"
                value="Si"
                label={"Higiene"}
              />
            </Col>
            <Col sm={12} md={4} lg={4} className="d-flex justify-content-center">
              <Form.Check
                type="checkbox"
                defaultValue={formData.antecedentesPersonalesNoPatologicos.convivenciaConAnimales}
                name="antecedentesPersonalesNoPatologicos.convivenciaConAnimales"
                value="Si"
                label={"Convivencia con Animales"}
              />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7 justify-content-center">
            <Col sm={12} md={4} lg={4} className="d-flex justify-content-center" >
              <Form.Check
                type="checkbox"
                defaultValue={formData.antecedentesPersonalesNoPatologicos.tatuajes}
                name="antecedentesPersonalesNoPatologicos.tatuajes"
                value="Si"
                label={"Tatuajes"}
              />
            </Col>
            <Col sm={12} md={4} lg={4} className="d-flex justify-content-center" >
              <Form.Check
                type="checkbox"
                label={"Deportes"}
                defaultValue={formData.antecedentesPersonalesNoPatologicos.deportes}
                name="antecedentesPersonalesNoPatologicos.deportes"
                value="Si"
              />
            </Col>
            <Col sm={12} md={4} lg={4} className="d-flex justify-content-center" >
              <Form.Check
                type="checkbox"
                label={"Vacunas"}
                defaultValue={formData.antecedentesPersonalesNoPatologicos.vacunas}
                name="antecedentesPersonalesNoPatologicos.vacunas"
                value="Si"
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

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    const dataPath = name.split('.');
    const lastKey = dataPath.pop();

    setFormData((prev) => {
      let ref = prev;
      for (let key of dataPath) {
        if (!ref[key]) ref[key] = {};
        ref = ref[key];
      }
      if (type === 'checkbox') {
        // Asigna 'Si' si está marcado, 'No' si no está marcado
        ref[lastKey] = checked ? 'Si' : 'No';
      } else {
        ref[lastKey] = value;
      }
      return { ...prev };
    });
  };

  return (
    <div>
      <h2 className="titulosMultiStep">Signos vitales</h2>
      <hr />
      <div>
        <Form onChange={onChange}>
          <Row className="mb-2 mb-md-4 mb-lg-7 justify-content-center">
            <Col sm={6} md={3} lg={3} className="d-flex justify-content-center">
              <Form.Check
                type="checkbox"
                name="signosVitales.TA"
                defaultValue={formData.signosVitales.TA}
                value="Si"
                label={"TA"}
              />
            </Col>
            <Col sm={6} md={3} lg={3} className="d-flex justify-content-center" >
              <Form.Check
                type="checkbox"
                name="signosVitales.temperatura"
                defaultValue={formData.signosVitales.temperatura}
                value="Si"
                label={"Temperatura"}
              />
            </Col>
            <Col sm={6} md={3} lg={3} className="d-flex justify-content-center" >
              <Form.Check
                type="checkbox"
                name="signosVitales.FR"
                defaultValue={formData.signosVitales.FR}
                value="Si"
                label={"FR"}
              />
            </Col>
            <Col sm={6} md={3} lg={3} className="d-flex justify-content-center" >
              <Form.Check
                type="checkbox"
                name="signosVitales.peso"
                defaultValue={formData.signosVitales.peso}
                value="Si"
                label={"Peso"}
              />
            </Col>
          </Row>

          {/*2da fila */}
          <Row className="mb-2 mb-md-4 mb-lg-7 justify-content-center">
            <Col sm={6} md={3} lg={3} className="d-flex justify-content-center">
              <Form.Check
                type="checkbox"
                name="signosVitales.talla"
                defaultValue={formData.signosVitales.talla}
                value="Si"
                label={"Talla"}
              />
            </Col>
            <Col sm={6} md={3} lg={3} className="d-flex justify-content-center" >
              <Form.Check
                type="checkbox"
                name="signosVitales.glucosaCapilar"
                defaultValue={formData.signosVitales.glucosaCapilar}
                value="Si"
                label={"Glucosa capilar"}
              />
            </Col>
            <Col sm={6} md={3} lg={3} className="d-flex justify-content-center" >
              <Form.Check
                type="checkbox"
                name="signosVitales.FC"
                defaultValue={formData.signosVitales.FC}
                value="Si"
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
  console.log(formData);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    const dataPath = name.split('.');
    const lastKey = dataPath.pop();

    setFormData((prev) => {
      let ref = prev;
      for (let key of dataPath) {
        if (!ref[key]) ref[key] = {};
        ref = ref[key];
      }
      if (type === 'checkbox') {
        ref[lastKey] = checked ? 'Si' : 'No';
      } else {
        ref[lastKey] = value;
      }
      return { ...prev };
    });
  };

  const onFileChange = (file, field) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      estudios: {
        ...prevFormData.estudios,
        [field]: {
          ...prevFormData.estudios[field],
          imagen: file
        }
      }
    }));
  };

  return (
    <div>
      <h2 className="titulosMultiStep">Estudios</h2>
      <hr />
      <div>
        <Form onChange={onChange}>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6} className="d-flex flex-column align-items-center">
              <div className="mb-2">
                <Form.Check
                  type="checkbox"
                  checked={formData.estudios.estudiosGabinete.estado === 'Si'}
                  name="estudios.estudiosGabinete.estado"
                  onChange={onChange}
                  label={"Estudios de gabinete"}
                />
              </div>
              <Form.Control
                as="textarea"
                defaultValue={formData.estudios.estudiosGabinete.descripcion}
                name="estudios.estudiosGabinete.descripcion"
                placeholder="Descripción de los estudios de gabinete (Radiografías, Resonancias, etc.)"
              />
              <Dropzone
                setImagenFile={(file) => onFileChange(file, 'estudiosGabinete')}
              />
            </Col>
            <Col sm={12} md={6} lg={6} className="d-flex flex-column align-items-center">
              <div className="mb-2">
                <Form.Check
                  type="checkbox"
                  checked={formData.estudios.estudiosLaboratorio.estado === 'Si'}
                  name="estudios.estudiosLaboratorio.estado"
                  onChange={onChange}
                  label={"Estudios de Laboratorio"}
                />
              </div>
              <Form.Control
                as="textarea"
                defaultValue={formData.estudios.estudiosLaboratorio.descripcion}
                name="estudios.estudiosLaboratorio.descripcion"
                placeholder="Descripción de los estudios de Laboratorio"
              />
              <div className="imagenPrincipal">
                <h4 className="textoImagenPrincipal">Sube tu imagen</h4>
                <div title="Seleccionar imagen de la categoría" className="imagenProducto">
                  <Dropzone
                    setImagenFile={(file) => onFileChange(file, 'estudiosLaboratorio')}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

function StepEight() {
  // Para almacenar los datos del formulario
  const { formData, setFormData } = useContext(SharedStateContext);
  console.log(formData)

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    const dataPath = name.split('.');
    const lastKey = dataPath.pop();

    setFormData((prev) => {
      let ref = prev;
      for (let key of dataPath) {
        if (!ref[key]) ref[key] = {};
        ref = ref[key];
      }
      if (type === 'checkbox') {
        // Asigna 'Si' si está marcado, 'No' si no está marcado
        ref[lastKey] = checked ? 'Si' : 'No';
      } else {
        ref[lastKey] = value;
      }
      return { ...prev };
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
                  defaultValue={formData.cavidadBucal.tejidosBlandos}
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
                  defaultValue={formData.cavidadBucal.tejidoOseo}
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
                  name="cavidadBucal.ATM"
                  defaultValue={formData.cavidadBucal.ATM}
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
                <Form.Check value="Si" defaultValue={formData.cavidadBucal.dolor.estado} name="cavidadBucal.dolor.estado" type="checkbox" label={"Dolor"} />
              </div>
              <Form.Control defaultValue={formData.cavidadBucal.dolor.descripcion} name="cavidadBucal.dolor.descripcion" as="textarea" placeholder="Descripción del dolor" />
            </Col>
            <Col sm={12} md={6} lg={6} className="d-flex flex-column align-items-center">
              <div className="mb-2">
                <Form.Check
                  value="Si"
                  formData={formData.cavidadBucal.crepitacion.estado}
                  name="cavidadBucal.crepitacion.estado"
                  type="checkbox"
                  label={"Crepitación"}
                />
              </div>
              <Form.Control
                defaultValue={formData.cavidadBucal.crepitacion.descripcion}
                name="cavidadBucal.crepitacion.descripcion"
                as="textarea"
                placeholder="Descripción de la crepitación"
              />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6} className="d-flex flex-column align-items-center">
              <Form.Check
                value="Si"
                defaultValue={formData.cavidadBucal.subluxacion.estado}
                name="cavidadBucal.subluxacion.estado"
                type="checkbox"
                label={"Subluxación"}
              />
              <Form.Control
                defaultValue={formData.cavidadBucal.subluxacion.descripcion}
                name="cavidadBucal.subluxacion.descripcion"
                as="textarea"
                placeholder="Descripción de la subluxación"
              />
            </Col>
            <Col sm={12} md={6} lg={6} className="d-flex flex-column align-items-center">
              <Form.Check
                value="Si"
                defaultValue={formData.cavidadBucal.anquilosis.estado}
                name="cavidadBucal.anquilosis.estado"
                type="checkbox"
                label={"Anquilosis"}
              />
              <Form.Control
                defaultValue={formData.cavidadBucal.anquilosis.descripcion}
                name="cavidadBucal.anquilosis.descripcion"
                as="textarea"
                placeholder="Descripción de la anquilosis"
              />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6} className="d-flex flex-column align-items-center">
              <div className="mb-2">
                <Form.Check defaultValue={formData.cavidadBucal.bruxismo.estado} name="cavidadBucal.bruxismo.estado" value="Si" type="checkbox" label={"Bruxismo"} />
              </div>
              <Form.Control
                defaultValue={formData.cavidadBucal.bruxismo.descripcion}
                name="cavidadBucal.bruxismo.descripcion"
                as="textarea"
                placeholder="Descripción del bruxismo"
              />
            </Col>
            <Col sm={12} md={6} lg={6} className="d-flex flex-column align-items-center">
              <div className="mb-2">
                <Form.Check
                  value="Si"
                  defaultValue={formData.cavidadBucal.espasmoMuscular.estado}
                  name="cavidadBucal.espasmoMuscular.estado"
                  type="checkbox"
                  label={"Espasmo muscular"}
                />
              </div>
              <Form.Control
                defaultValue={formData.cavidadBucal.espasmoMuscular.descripcion}
                name="cavidadBucal.espasmoMuscular.descripcion"
                as="textarea"
                placeholder="Descripción del espasmo muscular"
              />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6} className="d-flex flex-column align-items-center">
              <div className="mb-2">
                <Form.Check value="Si" defaultValue={formData.cavidadBucal.luxacion.estado} name="cavidadBucal.luxacion.estado" type="checkbox" label={"Luxación"} />
              </div>
              <Form.Control
                defaultValue={formData.cavidadBucal.luxacion.descripcion}
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
                <Form.Control defaultValue={formData.cavidadBucal.diagnostico} name="cavidadBucal.diagnostico" as="textarea" placeholder="Diagnóstico" />
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
                <Form.Control defaultValue={formData.cavidadBucal.pronostico} name="cavidadBucal.pronostico" as="textarea" placeholder="Pronóstico" />
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
                <Form.Control defaultValue={formData.cavidadBucal.planTratamiento} name="cavidadBucal.planTratamiento" as="textarea" placeholder="Plan de tratamiento" />
              </div>
            </Col>
          </Row>

        </Form>
      </div>
    </div>
  );
}

function StepNine() {
  const { formData, setFormData } = useContext(SharedStateContext);
  const { odontograma, setOdontograma } = useContext(SharedStateContext);

  const [identificador, setIdentificador] = useState("");

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
      const elemento = document.getElementById("divFig");

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
            setOdontograma(response);
            resolve(); // Resuelve la promesa después de establecer el enlace de la imagen
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

  const ejecutarCapturaEImagen = async () => {
    try {
      await capturarPantalla();
      console.log("Enlace de la imagen: " + odontograma); // Mover el console.log aquí
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
      <h2 className="titulosMultiStep">
        Odontograma
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
      <div className="divFig" id="divFig">
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
        <div className="container mt-5">
          <button onClick={ejecutarCapturasYMostrarLogs}>Capture Image</button>
        </div>
        {/* ESPACIO EN BLANCO */}
        <div className="container mt-5"></div>
      </div>
    </div>
  );
}

function StepTen() {
  const { formData, setFormData } = useContext(SharedStateContext);

  //AÑADE UN ESTADO PARA ALMACENAR LOS PROCEDIMIENTOS
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

  return (
    <div>
      <h2 className="titulosMultiStep">
        Procedimientos
      </h2>
      <div className="container mt-5">
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

const Registro = () => {
  // Para almacenar los datos del formulario
  const [formData, setFormData] = useState(initialFormData());
  const [odontograma, setOdontograma] = useState("");
  console.log(formData)
  console.log(odontograma)
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
      // Subir imágenes al servidor de Cloudinary antes de registrar la historia clínica

      console.log(formData.estudios.estudiosLaboratorio.imagen);
      const imagenEstLab = formData.estudios.estudiosLaboratorio.imagen;

      console.log(formData.estudios.estudiosGabinete.imagen, imagenEstLab);

      const uploads = [];

      if (formData.estudios.estudiosGabinete.imagen) {
        const uploadPromise = subeArchivosCloudinary(formData.estudios.estudiosGabinete.imagen, 'estudiosGabinete')
          .then(url => {
            formData.estudios.estudiosGabinete.imagen = url; // Actualiza la propiedad con la URL
            return url; // Opcionalmente puedes devolver la URL si es necesario para algo más
          });
        uploads.push(uploadPromise);
      }

      if (formData.estudios.estudiosLaboratorio.imagen) {
        const uploadPromise = subeArchivosCloudinary(formData.estudios.estudiosLaboratorio.imagen, 'estudiosLaboratorio')
          .then(url => {
            formData.estudios.estudiosLaboratorio.imagen = url; // Actualiza la propiedad con la URL
            return url; // Opcionalmente puedes devolver la URL si es necesario para algo más
          });
        uploads.push(uploadPromise);
      }

      // Esperar a que todas las imágenes se hayan subido y las URLs estén actualizadas en formData
      await Promise.all(uploads);

      console.log('Imágenes subidas y URLs actualizadas en formData:', formData);

      const dataTemp = {
        datosPaciente: formData.datosPaciente,
        interrogatorio: formData.interrogatorio,
        antecedentesHeredofamiliares: formData.antecedentesHeredofamiliares,
        antecedentesPersonalesPatologicos: formData.antecedentesPersonalesPatologicos,
        antecedentesPersonalesNoPatologicos: formData.antecedentesPersonalesNoPatologicos,
        signosVitales: formData.signosVitales,
        estudios: formData.estudios,
        cavidadBucal: formData.cavidadBucal,
        procedimientos: formData.procedimientos,
        odontograma: odontograma,
        odontogramaFinal: "",
        estado: "true",
      };

      registraHistoriaClinica(dataTemp).then((response) => {
        const { data } = response;
        window.location.reload();
        //cancelarRegistro()
        toast.success("Historia clinica registrada correctamente");
      })
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Autenticate>
      <Container titulo="Registrar">
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
              <SharedStateContext.Provider value={{ formData, setFormData, odontograma, setOdontograma }}>
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
                      <FontAwesomeIcon icon={faCloudArrowUp} />
                      &nbsp; Enviar
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
};

function initialFormData() {
  return {
    datosPaciente: {
      nombre: "",
      edad: "",
      sexo: "",
      escolaridad: "",
      fechaNacimiento: "",
      expediente: "",
      email: "",
      telefono: "",
    },
    interrogatorio: {
      motivoConsulta: "",
      padecimientoActual: "",
      padecimientosSistemticos: "",
      tomandoMedicamento: ""
    },
    antecedentesHeredofamiliares: {
      diabetes: {
        estado: "No",
        descripcion: ""
      },
      nefropatias: {
        estado: "No",
        descripcion: ""
      },
      cancer: {
        estado: "No",
        descripcion: ""
      },
      alergias: {
        estado: "No",
        descripcion: ""
      },
      hipertension: {
        estado: "No",
        descripcion: ""
      },
      tuberculosis: {
        estado: "No",
        descripcion: ""
      },
      cardiopatias: {
        estado: "No",
        descripcion: ""
      },
      otros: {
        estado: "No",
        descripcion: ""
      },
    },
    antecedentesPersonalesPatologicos: {
      diabetes: {
        estado: "No",
        descripcion: ""
      },
      nefropatias: {
        estado: "No",
        descripcion: ""
      },
      cancer: {
        estado: "No",
        descripcion: ""
      },
      alergias: {
        estado: "No",
        descripcion: ""
      },
      hipertension: {
        estado: "No",
        descripcion: ""
      },
      tuberculosis: {
        estado: "No",
        descripcion: ""
      },
      cardiopatias: {
        estado: "No",
        descripcion: ""
      },
      transtornosHemorragicos: {
        estado: "No",
        descripcion: ""
      },
      toxicomanias: {
        estado: "No",
        descripcion: ""
      },
      grupoSanguineo: {
        estado: "No",
        descripcion: ""
      },
    },
    antecedentesPersonalesNoPatologicos: {
      alimentacion: "No",
      higiene: "No",
      convivenciaConAnimales: "No",
      tatuajes: "No",
      deportes: "No",
      vacunas: "No",
    },
    signosVitales: {
      TA: "No",
      glucosaCapilar: "No",
      temperatura: "No",
      FC: "No",
      FR: "No",
      talla: "No",
      peso: "No"
    },
    estudios: {
      estudiosGabinete: {
        estado: "No",
        descripcion: "",
        imagen: null
      },
      estudiosLaboratorio: {
        estado: "No",
        descripcion: "",
        imagen: null
      }
    },
    cavidadBucal: {
      tejidosBlandos: "",
      tejidoOseo: "",
      ATM: "",
      dolor: {
        estado: "No",
        descripcion: ""
      },
      crepitacion: {
        estado: "No",
        descripcion: ""
      },
      subluxacion: {
        estado: "No",
        descripcion: ""
      },
      anquilosis: {
        estado: "No",
        descripcion: ""
      },
      bruxismo: {
        estado: "No",
        descripcion: ""
      },
      espasmoMuscular: {
        estado: "No",
        descripcion: ""
      },
      luxacion: {
        estado: "No",
        descripcion: ""
      },
      diagnostico: "",
      pronostico: "",
      planTratamiento: "",
    },
    procedimientos: [],
    odontograma: "",
    odontogramaFinal: ""
  }
}

export default Registro;
