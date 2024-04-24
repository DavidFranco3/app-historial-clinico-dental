import { useEffect, useState, useContext, createContext } from "react";
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


           {/*EXPEDIENTE Y EMAIL*/}
           <Row className="justify-content-center mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={4} lg={4}>
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Expediente:</Form.Label>
                <Form.Control name="expedientePaciente" defaultValue={formData.expedientePaciente} type="text" />
              </div>
            </Col>
            <Col sm={12} md={4} lg={4}>
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Correo electronico:</Form.Label>
                <Form.Control name="emailPaciente" defaultValue={formData.emailPaciente} type="email" />
              </div>
            </Col>
          </Row>

          {/*TELEFONO*/}
          <Row className="justify-content-center mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={4} lg={4}>
              <div className="d-flex flex-column align-items-center">
                <Form.Label>Teléfono particular o celular:</Form.Label>
                <Form.Control name="telefonoPaciente" defaultValue={formData.telefonoPaciente} type="tel" />
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
                <Form.Control defaultValue={formData.descripcionDiabetesAntecedentes} name="descripcionDiabetesAntecedentes" as="textarea" placeholder="Añade descripción" />
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
            <div className="d-flex flex-column align-items-center">
                <Form.Check
                  type="checkbox"
                  label={"Hipertensión"}
                  value="Si"
                  defaultValue={formData.descripcionHipertensionAntecedentes}
                  name="descripcionHipertensionAntecedentes"
                />
                <Form.Control as="textarea" placeholder="Añade descripción" />
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
                <Form.Control name="descripcionAlergiasAntecedentes" defaultValue={formData.descripcionAlergiasAntecedentes} as="textarea" placeholder="Añade descripción" />
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
                name="tallaSignosVitales"
                defaultValue={formData.tallaSignosVitales}
                value="Si"
                label={"TA"}
              />
            </Col>
            <Col sm={6} md={3} lg={3}>
              <Form.Check
                type="checkbox"
                name="temperaturaSignosVitales"
                defaultValue={formData.temperaturaSignosVitales}
                value="Si"
                label={"Temperatura"}
              />
            </Col>
            <Col sm={6} md={3} lg={3}>
              <Form.Check
                type="checkbox"
                name="glucosaCapilarSignosVitales"
                defaultValue={formData.glucosaCapilarSignosVitales}
                value="Si"
                label={"FR"}
              />
            </Col>
            <Col sm={6} md={3} lg={3}>
              <Form.Check
                type="checkbox"
                name="pesoSignosVitales"
                defaultValue={formData.pesoSignosVitales}
                value="Si"
                label={"Peso"}
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
      registraHistoriaClinica(dataTemp).then((response) => {
        const { data } = response;
        descargaPDF();
        //cancelarRegistro()
      })
    } catch (e) {
      console.log(e);
    }
  };

  const descargaPDF = async () => {

    const docDefinition = {
      pageSize: 'LETTER',
      footer: function (currentPage, pageCount) {
        return {
          table: {
            widths: ['100%'],
            body: [
              [
                {
                  border: [false, false, false, false],
                  text: 'Página ' + currentPage.toString() + ' de ' + pageCount.toString(),
                  alignment: 'right',
                  margin: [5, 2, 10, 20]
                }
              ]
            ]
          },
        }
      },
      content: [
        {
          alignment: 'center',
          style: 'header',
          image: `data:image/png;base64,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`
        },
        {
          margin: [0, 0, 0, 10],
          table: {
            widths: ['50%', '50%'],
            heights: [10, 30],
            body: [
              [
                {
                  text: `Nombre del paciente:  ${formData.nombrePaciente}`,
                  fontSize: 9,
                  bold: true,
                },
                {
                  text: `Edad del paciente:  ${formData.edadPaciente}`,
                  fontSize: 9,
                  bold: true,
                }
              ],
              [
                {
                  text: `Sexo del paciente:  ${formData.sexoPaciente}`,
                  fontSize: 9,
                  colSpan: 2,
                  bold: true
                },
                {
                }
              ],
            ],
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['25%', '25%', '25%', '25%'],
            heights: [10, 10, 10, 10, 30],
            headerRows: 1,
            body: [
              [
                {
                  text: `Escolaridad:  ${formData.escolaridadPaciente}`,
                  fontSize: 9,
                  colSpan: 2,
                  bold: true
                },
                {
                },
                {
                  text: `Fecha de nacimiento del paciente:  ${formData.fechaNacimientoPaciente}`,
                  fontSize: 9,
                  colSpan: 2,
                  bold: true,
                },
                {
                }
              ],
              [
                {
                  text: `Expediente:  ${formData.expedientePaciente}`,
                  colSpan: 2,
                  bold: true,
                  fontSize: 9
                },
                {
                },
                {
                  text: `Correo electronico del paciente:  ${formData.emailPaciente}`,
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                }
              ],
              [
                {
                  text: `Telefono del paciente:  ${formData.telefonoPaciente}`,
                  colSpan: 4,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {

                },
                {
                }
              ],
              [
                {
                  text: [
                    'Motivo de la consulta: ',
                    {
                      text: formData.motivoConsulta,
                      bold: false
                    }
                  ],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: [
                    'Padecimiento actual: ',
                    {
                      text: formData.padecimientoActual,
                      bold: false
                    }
                  ],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                }
              ],
              [
                {
                  text: `Padecimientos sistemicos:  ${formData.padecimientosSistemticos}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Tomando medicamento:  ${formData.tomandoMedicamento}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Diabetes :  ${formData.estadoDiabetes}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Descripcion:  ${formData.descripcionDiabetes}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Nefropatias :  ${formData.estadoNefropatias}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Descripcion:  ${formData.descripcionNefropatias}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Cancer :  ${formData.estadoCancer}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Descripcion:  ${formData.descripcionCancer}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Alergias :  ${formData.estadoAlergias}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Descripcion:  ${formData.descripcionAlergias}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Hipertension:  ${formData.estadoHipertension}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Descripcion:  ${formData.descripcionHipertension}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Tuberculosis:  ${formData.estadoTuberculosis}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Descripcion:  ${formData.descripcionTuberculosis}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Cardiopatias:  ${formData.estadoCardiopatias}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Descripcion:  ${formData.descripcionCardiopatias}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Otros:  ${formData.estadoOtros}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Descripcion:  ${formData.descripcionOtros}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Diabetes:  ${formData.estadoDiabetesAntecedentes}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Descripcion:  ${formData.descripcionDiabetesAntecedentes}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Nefropatiias:  ${formData.estadoNefropatiasAntecedentes}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Descripcion:  ${formData.descripcionNefropatiasAntecedentes}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Cancer:  ${formData.estadoCancerAntecedentes}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Descripcion:  ${formData.descripcionCancerAntecedentes}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Alergias:  ${formData.estadoAlergiasAntecedentes}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Descripcion:  ${formData.descripcionAlergiasAntecedentes}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Hemorragias:  ${formData.estadoHemorragiasAntecedentes}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Descripcion:  ${formData.descripcionHemorragiasAntecedentes}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Hipertension:  ${formData.estadoHipertensionAntecedentes}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Descripcion:  ${formData.descripcionHipertensionAntecedentes}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Tuberculosis:  ${formData.estadoTuberculosisAntecedentes}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Descripcion:  ${formData.descripcionTuberculosisAntecedentes}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Cardiopatias:  ${formData.estadoCardiopatiasAntecedentes}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Descripcion:  ${formData.descripcionCardiopatiasAntecedentes}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Taxicomanias:  ${formData.estadoTaxicomaniasAntecedentes}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Descripcion:  ${formData.descripcionTaxicomaniasAntecedentes}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Grupo sanguineo:  ${formData.estadoSanguineoAntecedentes}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Descripcion:  ${formData.descripcionSanguineoAntecedentes}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Diabetes :  ${formData.estadoDiabetes}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Descripcion:  ${formData.descripcionDiabetes}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Alimentacion:  ${formData.alimentacionAntipatologias}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Higiene:  ${formData.higieneAntipatologias}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Conviveencia con animales:  ${formData.convivenciaConAnimalesAntipatologias}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Tatuajes:  ${formData.tatuajesAntipatologias}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Deportes:  ${formData.deportesAntipatologias}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Vacunas:  ${formData.vacunasAntipatologias}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `TA:  ${formData.TASignosVitales}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Glucosa capilar:  ${formData.glucosaCapilarSignosVitales}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Temperatura:  ${formData.temperaturaSignosVitales}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `FC:  ${formData.FCSignosVitales}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `FR:  ${formData.FRSignosVitales}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Tallas:  ${formData.tallaSignosVitales}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Peso :  ${formData.pesoSignos}`,
                  border: [true, true, true, true],
                  colSpan: 4,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                },
                {
                },
              ],
              [
                {
                  text: `Estudios de gabinete:  ${formData.estadoEstudiosGabinete}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Descripcion:  ${formData.descripcionEstudiosGabinete}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Estudios de laboratorio:  ${formData.estadoEstudiosLaboratorio}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Descripcion:  ${formData.descripcionEstudiosLaboratorio}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Tejidos blandos:  ${formData.tejidosBlandosCavidadBucal}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Tejidos oseos:  ${formData.tejidoOseoCavidadBucal}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `ATM:  ${formData.ATMCavidadBucal}`,
                  border: [true, true, true, true],
                  colSpan: 4,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                },
                {
                },
              ],
              [
                {
                  text: `Dolor:  ${formData.estadoDolor}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Descripcion:  ${formData.descripcionDolor}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Crepitacion:  ${formData.estadoCrepitacion}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Descripcion:  ${formData.descripcionCrepitacion}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Subluxacion:  ${formData.estadosubluxacion}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Descripcion:  ${formData.descripcionsubluxacion}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Anquilosis:  ${formData.estadoAnquilosis}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Descripcion:  ${formData.descripcionAnquilosis}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Bruxismo:  ${formData.estadoBruxismo}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Descripcion:  ${formData.descripcionBruxismo}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Espasmo muscular:  ${formData.estadoEspasmoMuscular}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Descripcion:  ${formData.descripcionEspasmoMuscular}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Luxacion:  ${formData.estadoLuxacion}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Descripcion:  ${formData.descripcionLuxacion}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Diagnostico:  ${formData.diagnostico}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                  text: `Pronostico:  ${formData.pronostico}`,
                  border: [true, true, true, true],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true
                },
                {
                },
              ],
              [
                {
                  text: `Plan de tratamiento:  ${formData.planTratamiento}`,
                  border: [true, true, true, true],
                  colSpan: 4,
                  fontSize: 9,
                  bold: true
                },
                {
                },
                {
                },
                {
                },
              ],
            ]
          }
        },
      ],
    };

    const pdf = pdfMake.createPdf(docDefinition);

    pdf.download(`${formData.nombrePaciente}.pdf`);
  }

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
                    },
                  }}
                  nextButton={{
                    title: isLastStep ? "Finalizar" : "Siguiente",
                    onClick: goToNextStep,
                    style: {
                      background: "#d1ecf1",
                      borderColor: "#bee5eb",
                      color: "#007bff",
                      marginLeft: "50%",
                      borderRadius: "5px",
                      padding: "10px 20px",
                    },
                  }}
                />
                <Button variant="success" onClick={onSubmit}>
                  <FontAwesomeIcon icon={faCloudArrowUp} />
                  &nbsp; Enviar
                </Button>
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
    estadoTaxicomaniasAntecedentes: "",
    descripcionTaxicomaniasAntecedentes: "",
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
  }
}

export default Registro;
