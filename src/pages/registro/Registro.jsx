import { useEffect, useState, useContext, createContext } from "react";
import { Modal } from "react-bootstrap";
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
  
  console.log(formData)

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

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
                <Form.Control name="nombrePaciente" defaultValue={formData.nombrePaciente} type="text" />
              </div>
            </Col>
            <Col sm={12} md={4} lg={4}>
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Edad (Años):</Form.Label>
                <Form.Control name="edadPaciente" defaultValue={formData.edadPaciente} type="number" />
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
                    <Form.Check type="checkbox" value="Masculino" checked={formData.sexoPaciente == "Masculino"} name="sexoPaciente" id="sexoPaciente" defaultValue={formData.sexoPaciente} label={"Masculino"} inline />
                    <Form.Check type="checkbox" value="Femenino" checked={formData.sexoPaciente == "Femenino"} name="sexoPaciente" id="sexoPaciente" defaultValue={formData.sexoPaciente} label={"Femenino"} inline />
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={12} md={4} lg={4}>
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Fecha de nacimiento:</Form.Label>
                <Form.Control name="fechaNacimientoPaciente" defaultValue={formData.fechaNacimientoPaciente} type="date" />
              </div>
            </Col>
          </Row>


           {/*EXPEDIENTE Y ESCOLARIDAD*/}
           <Row className="justify-content-center mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={4} lg={4}>
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Expediente:</Form.Label>
                <Form.Control name="expedientePaciente" defaultValue={formData.expedientePaciente} type="text" />
              </div>
            </Col>
            <Col sm={12} md={4} lg={4}>
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Escolaridad:</Form.Label>
                <Form.Control name="escolaridadPaciente" defaultValue={formData.escolaridadPaciente} type="email" />
              </div>
            </Col>
          </Row>

          {/*TELEFONO Y EMAIL*/}
          <Row className="justify-content-center mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={4} lg={4}>
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Teléfono particular o celular:</Form.Label>
                <Form.Control name="telefonoPaciente" defaultValue={formData.telefonoPaciente} type="tel" />
              </div>
            </Col>
            <Col sm={12} md={4} lg={4}>
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Correo electrónico:</Form.Label>
                <Form.Control name="emailPaciente" defaultValue={formData.emailPaciente} type="email" />
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
                  defaultValue={formData.motivoConsulta}
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
                defaultValue={formData.padecimientoActual}
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
                defaultValue={formData.padecimientosSistemticos}
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
                    defaultValue={formData.tomandoMedicamento}
                    label={"No"}
                    inline
                    value="No" // Valor asociado al radio button
                    checked={formData.tomandoMedicamento === "No"} // Verificar si este radio button está seleccionado
                  />
                  <Form.Check
                    type="checkbox"
                    name="tomandoMedicamento"
                    defaultValue={formData.tomandoMedicamento}
                    label={"Sí"}
                    inline
                    value="Si"
                    checked={formData.tomandoMedicamento === "Si"}
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
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    const { name, checked } = e.target;
  }
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
                  name="estadoDiabetes"
                  defaultValue={formData.estadoDiabetes}
                  value="Si"
                />
                <Form.Control name="descripcionDiabetes" defaultValue={formData.descripcionDiabetes} as="textarea" placeholder="Añade descripción" />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
              <Form.Check
                  name="estadoHipertension"
                  defaultValue={formData.estadoHipertension}
                  value="Si"
                  type="checkbox"
                  label={"Hipertensión"}
                />
                <Form.Control name="descripcionHipertension" defaultValue={formData.descripcionHipertension} as="textarea" placeholder="Añade descripción" />
              </div>
            </Col>
          </Row>


          {/*NEFROPATÍAS Y TUBERCULOSIS*/}
          <Row className=" justify-content-center mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  name="estadoNefropatias"
                  defaultValue={formData.estadoNefropatias}
                  value="Si"
                  type="checkbox"
                  label={"Nefropatías"}
                />
                <Form.Control defaultValue={formData.descripcionNefropatias} name="descripcionNefropatias" as="textarea" placeholder="Añade descripción" />
              </div>
              
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  name="estadoTuberculosis"
                  defaultValue={formData.estadoTuberculosis}
                  value="Si"
                  type="checkbox"
                  label={"Tuberculosis"}
                />
                <Form.Control defaultValue={formData.descripcionTuberculosis} name="descripcionTuberculosis" as="textarea" placeholder="Añade descripción" />
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
                  defaultValue={formData.estadoCancer}
                  name="estadoCancer"
                />
                <Form.Control
                  as="textarea"
                  placeholder="Añade descripción"
                  name="descripcionCancer"
                  defaultValue={formData.descripcionCancer}
                />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  value="Si"
                  defaultValue={formData.estadoCardiopatias}
                  name="estadoCardiopatias"
                  type="checkbox"
                  label={"Cardiopatías"}
                />
                <Form.Control defaultValue={formData.descripcionCardiopatias} name="descripcionCardiopatias" as="textarea" placeholder="Añade descripción" />
              </div>
            </Col>
          </Row>

          {/*ALERGÍAS Y OTROS*/}
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  type="checkbox"
                  defaultValue={formData.estadoAlergias}
                  name="estadoAlergias"
                  value="Si"
                  label={"Alergias"}
                />
                <Form.Control defaultValue={formData.descripcionAlergias} name="descripcionAlergias" as="textarea" placeholder="Añade descripción" />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  type="checkbox"
                  label={"Otros"}
                  defaultValue={formData.estadoOtros}
                  name="estadoOtros"
                  value="Si"
                />
                <Form.Control name="descripcionOtros" defaultValue={formData.descripcionOtros} as="textarea" placeholder="Añade descripción" />
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
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    const { name, checked } = e.target;
  }
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
                  name="estadoDiabetesAntecedentes"
                  defaultValue={formData.estadoDiabetesAntecedentes}
                />
                <Form.Control 
                  defaultValue={formData.descripcionDiabetesAntecedentes} 
                  name="descripcionDiabetesAntecedentes" 
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
                  defaultValue={formData.estadoHipertensionAntecedentes}
                  name="descripcionNeestadoNefropatiasAntecedentes"
                />
                <Form.Control 
                  defaultValue={formData.descripcionHipertensionAntecedentes} 
                  name="descripcionTuberculosisAntecedentes" 
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
                  defaultValue={formData.estadoNefropatiasAntecedentes}
                  name="estadoNefropatiasAntecedentes"
                  type="checkbox"
                  label={"Nefropatías"}
                />
                <Form.Control defaultValue={formData.descripcionNefropatiasAntecedentes} name="descripcionNefropatiasAntecedentes" as="textarea" placeholder="Añade descripción" />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  value="Si"
                  defaultValue={formData.estadoTuberculosisAntecedentes}
                  name="estadoTuberculosisAntecedentes"
                  type="checkbox"
                  label={"Tuberculosis"}
                />
                <Form.Control name="descripcionTuberculosisAntecedentes" defaultValue={formData.descripcionTuberculosisAntecedentes} as="textarea" placeholder="Añade descripción" />
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
                  defaultValue={formData.estadoCancerAntecedentes}
                  name="estadoCancerAntecedentes"
                />
                <Form.Control name="descripcionCancerAntecedentes" defaultValue={formData.descripcionCancerAntecedentes} as="textarea" placeholder="Añade descripción" />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  value="Si"
                  defaultValue={formData.estadoCardiopatiasAntecedentes}
                  name="estadoCardiopatiasAntecedentes"
                  type="checkbox"
                  label={"Cardiopatías"}
                />
                <Form.Control name="descripcionCardiopatiasAntecedentes" defaultValue={formData.descripcionCardiopatiasAntecedentes} as="textarea" placeholder="Añade descripción" />
              </div>
            </Col>
          </Row>


          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  defaultValue={formData.estadoAlergiasAntecedentes}
                  name="estadoAlergiasAntecedentes"
                  value="Si"
                  type="checkbox"
                  label={"Alergias"}
                />
                <Form.Control 
                  name="descripcionAlergiasAntecedentes" 
                  defaultValue={formData.descripcionAlergiasAntecedentes} 
                  as="textarea" 
                  placeholder="Añade descripción" 
                />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  defaultValue={formData.estadoToxicomaniasAntecedentes}
                  name="estadoToxicomaniasAntecedentes"
                  value="Si"
                  type="checkbox"
                  label={"Toxicomanias"}
                />
                <Form.Control 
                  name="descripcionToxicomaniasAntecedentes" 
                  defaultValue={formData.descripcionToxicomaniasAntecedentes} 
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
                  defaultValue={formData.estadoSanguineoAntecedentes}
                  name="estadoSanguineoAntecedentes"
                  value="Si"
                  type="checkbox"
                  label={"Sanguineo"}
                />
                <Form.Control 
                  name="descripcionSanguineoAntecedentes" 
                  defaultValue={formData.descripcionSanguineoAntecedentes} 
                  as="textarea" 
                  placeholder="Añade descripción" 
                />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="d-flex flex-column align-items-center">
                <Form.Check
                  defaultValue={formData.estadoHemorragiasAntecedentes}
                  name="estadoHemorragiasAntecedentes"
                  value="Si"
                  type="checkbox"
                  label={"Hemorragias"}
                />
                <Form.Control 
                  name="descripcionHemorragiasAntecedentes" 
                  defaultValue={formData.descripcionHemorragiasAntecedentes} 
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
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    const { name, checked } = e.target;
  }
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
                defaultValue={formData.alimentacionAntipatologias}
                name="alimentacionAntipatologias"
                value="Si"
                type="checkbox"
                label={"Alimentación"}
              />
            </Col>
            <Col sm={12} md={4} lg={4} className="d-flex justify-content-center">
              <Form.Check
                type="checkbox"
                defaultValue={formData.hiegieneAntipatologias}
                name="higieneAntipatologias"
                value="Si"
                label={"Higiene"}
              />
            </Col>
            <Col sm={12} md={4} lg={4} className="d-flex justify-content-center">
              <Form.Check
                type="checkbox"
                defaultValue={formData.convivenciaConAnimalesAntipatologias}
                name="convivenciaConAnimalesAntipatologias"
                value="Si"
                label={"Convivencia con Animales"}
              />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7 justify-content-center">
            <Col sm={12} md={4} lg={4} className="d-flex justify-content-center" >
              <Form.Check
                type="checkbox"
                defaultValue={formData.tatuajesnAntipatologias}
                name="tatuajesAntipatologias"
                value="Si"
                label={"Tatuajes"}
              />
            </Col>
            <Col sm={12} md={4} lg={4} className="d-flex justify-content-center" >
              <Form.Check
                type="checkbox"
                label={"Deportes"}
                defaultValue={formData.deportesAntipatologias}
                name="deportesAntipatologias"
                value="Si"
              />
            </Col>
            <Col sm={12} md={4} lg={4} className="d-flex justify-content-center" >
              <Form.Check
                type="checkbox"
                label={"Vacunas"}
                defaultValue={formData.vacunasAntipatologias}
                name="vacunasAntipatologias"
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
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    const { name, checked } = e.target;
  }
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
                name="TASignosVitales"
                defaultValue={formData.TASignosVitales}
                value="Si"
                label={"TA"}
              />
            </Col>
            <Col sm={6} md={3} lg={3} className="d-flex justify-content-center" >
              <Form.Check
                type="checkbox"
                name="temperaturaSignosVitales"
                defaultValue={formData.temperaturaSignosVitales}
                value="Si"
                label={"Temperatura"}
              />
            </Col>
            <Col sm={6} md={3} lg={3} className="d-flex justify-content-center" >
              <Form.Check
                type="checkbox"
                name="FR"
                defaultValue={formData.FRSignosVitales}
                value="Si"
                label={"FR"}
              />
            </Col>
            <Col sm={6} md={3} lg={3} className="d-flex justify-content-center" >
              <Form.Check
                type="checkbox"
                name="pesoSignosVitales"
                defaultValue={formData.pesoSignosVitales}
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
                name="tallaSignosVitales"
                defaultValue={formData.tallaSignosVitales}
                value="Si"
                label={"Talla"}
              />
            </Col>
            <Col sm={6} md={3} lg={3} className="d-flex justify-content-center" >
              <Form.Check
                type="checkbox"
                name="glucosaCapilarSignosVitales"
                defaultValue={formData.glucosaCapilarSignosVitales}
                value="Si"
                label={"Glucosa capilar"}
              />
            </Col>
            <Col sm={6} md={3} lg={3} className="d-flex justify-content-center" >
              <Form.Check
                type="checkbox"
                name="FCSignosVitales"
                defaultValue={formData.FCSignosVitales}
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
  // Para almacenar los datos del formulario
  const { formData, setFormData } = useContext(SharedStateContext);
  console.log(formData)
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    const { name, checked } = e.target;
  }

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
                  defaultValue={formData.estadoEstudiosGabinete}
                  name="estadoEstudiosGabinete"
                  value="Si"
                  label={"Estudios de gabinete"}
                />
              </div>
              <Form.Control
                as="textarea"
                defaultValue={formData.descripcionEstudiosGabinete}
                name="descripcionEstudiosGabinete"
                placeholder="Descripción de los estudios de gabinete (Radiografías, Resonancias, etc.)"
              />
              <Form.Control name="imagenEstudiosGabinete" defaultValue={formData.imagenEstudiosGabinete} type="file" className="mt-2" />
            </Col>
            <Col sm={12} md={6} lg={6} className="d-flex flex-column align-items-center">
              <div className="mb-2">
                <Form.Check
                  type="checkbox"
                  defaultValue={formData.estadoEstudiosLaboratorio}
                  name="estadoEstudiosLaboratorio"
                  value="Si"
                  label={"Estudios de Laboratorio"}
                />
              </div>
              <Form.Control
                as="textarea"
                defaultValue={formData.descripcionEstudiosLaboratorio}
                name="descripcionEstudiosLaboratorio"
                placeholder="Descripción de los estudios de Laboratorio (Radiografías, Resonancias, etc.)"
              />
              <Form.Control name="imagenEstudiosLaboratorio" defaultValue={formData.imagenEstudiosLaboratorio} type="file" className="mt-2" />
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
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    const { name, checked } = e.target;
  }

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
                defaultValue={formData.tejidosBlandosCavidadBucal}
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
                defaultValue={formData.tejidoOseoCavidadBucal}
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
                  defaultValue={formData.ATMCavidadBucal}
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
                <Form.Check value="Si" defaultValue={formData.estadoDolor} name="estadoDolor" type="checkbox" label={"Dolor"} />
            </div>
              <Form.Control defaultValue={formData.descripcionDolor} name="descripcionDolor" as="textarea" placeholder="Descripción del dolor" />
            </Col>
            <Col sm={12} md={6} lg={6} className="d-flex flex-column align-items-center">
              <div className="mb-2">
                <Form.Check
                  value="Si"
                  formData={formData.estadoCrepitacion}
                  name="estadoCrepitacion"
                  type="checkbox"
                  label={"Crepitación"}
                />
              </div>
              <Form.Control
                defaultValue={formData.descripcionCrepitacion}
                name="descripcionCrepitacion"
                as="textarea"
                placeholder="Descripción de la crepitación"
              />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6} className="d-flex flex-column align-items-center">
              <Form.Check
                value="Si"
                defaultValue={formData.estadosubluxacion}
                name="estadosubluxacion"
                type="checkbox"
                label={"Subluxación"}
              />
              <Form.Control
                defaultValue={formData.descripcionsubluxacion}
                name="descripcionsubluxacion"
                as="textarea"
                placeholder="Descripción de la subluxación"
              />
            </Col>
            <Col sm={12} md={6} lg={6} className="d-flex flex-column align-items-center">
              <Form.Check
                value="Si"
                defaultValue={formData.estadoAnquilosis}
                name="estadoAnquilosis"
                type="checkbox"
                label={"Anquilosis"}
              />
              <Form.Control
                defaultValue={formData.descripcionAnquilosis}
                name="descripcionAnquilosis"
                as="textarea"
                placeholder="Descripción de la anquilosis"
              />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6} className="d-flex flex-column align-items-center">
              <div className="mb-2">
                <Form.Check defaultValue={formData.estadoBruxismo} name="estadoBruxismo" value="Si" type="checkbox" label={"Bruxismo"} />
              </div>
              <Form.Control
                defaultValue={formData.descripcionBruxismo}
                name="descripcionBruxismo"
                as="textarea"
                placeholder="Descripción del bruxismo"
              />
            </Col>
            <Col sm={12} md={6} lg={6} className="d-flex flex-column align-items-center">
              <div className="mb-2"> 
                <Form.Check
                  value="Si"
                  defaultValue={formData.estadoEspasmoMuscular}
                  name="estadoEspasmoMuscular"
                  type="checkbox"
                  label={"Espasmo muscular"}
                />
              </div>
              <Form.Control
                defaultValue={formData.descripcionEspasmoMuscular}
                name="descripcionEspasmoMuscular"
                as="textarea"
                placeholder="Descripción del espasmo muscular"
              />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6} className="d-flex flex-column align-items-center">
              <div className="mb-2">
                <Form.Check value="Si" defaultValue={formData.estadoLuxacion} name="estadoLuxacion" type="checkbox" label={"Luxación"} />
              </div>
              <Form.Control
                defaultValue={formData.descripcionLuxacion}
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
                <Form.Control defaultValue={formData.diagnostico} name="diagnostico" as="textarea" placeholder="Diagnóstico" />
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
                <Form.Control defaultValue={formData.pronostico} name="pronostico" as="textarea" placeholder="Pronóstico" />
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
                <Form.Control defaultValue={formData.planTratamiento} name="planTratamiento" as="textarea" placeholder="Plan de tratamiento" />
              </div>
            </Col>
          </Row>
          
        </Form>
      </div>
    </div>
  );
}

function StepNine() {
  const {formData, setFormData} = useContext(SharedStateContext)

  const [identificador, setIdentificador] = useState("");

  //AÑADE UN ESTADO PARA ALMACENAR LOS PROCEDIMIENTOS
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
      <h2 className="titulosMultiStep">
        Procedimientos
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

const Registro = () => {
  // Para almacenar los datos del formulario
  const [formData, setFormData] = useState(initialFormData());
  console.log(formData)
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



  const onSubmit = (e) => {
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
            estado: formData.estadoToxicomaniasAntecedentes,
            descripcion: formData.descripcionToxicomaniasAntecedentes
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
        procedimientos: formData.procedimientos,
        estado: "true",
      };
      registraHistoriaClinica(dataTemp).then((response) => {
        const { data } = response;
        //cancelarRegistro()
        alert("Historia clinica registrada correctamente")
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

export default Registro;
