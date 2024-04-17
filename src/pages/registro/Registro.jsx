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
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col
              sm={12}
              md={4}
              lg={4}
              className="d-flex align-items-end justify-content-start justify-content-md-end justify-content-lg-end"
            >
              <Form.Label>Nombre del paciente:</Form.Label>
            </Col>
            <Col sm={12} md={8} lg={8}>
              <Form.Control name="nombrePaciente" defaultValue={formData.nombrePaciente} type="text" />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col
              sm={12}
              md={4}
              lg={4}
              className="d-flex align-items-end justify-content-start justify-content-md-end justify-content-lg-end"
            >
              <Form.Label>Edad (Años):</Form.Label>
            </Col>
            <Col sm={12} md={8} lg={8}>
              <Form.Control name="edadPaciente" defaultValue={formData.edadPaciente} type="number" />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col
              sm={12}
              md={4}
              lg={4}
              className="d-flex align-items-end justify-content-start justify-content-md-end justify-content-lg-end"
            >
              <Form.Label>Sexo:</Form.Label>
            </Col>
            <Col sm={12} md={8} lg={8} className="justify-content-start">
              <Form.Check type="checkbox" value="Masculino" checked={formData.sexoPaciente == "Masculino"} name="sexoPaciente" id="sexoPaciente" defaultValue={formData.sexoPaciente} label={"Masculino"} inline />
              <Form.Check type="checkbox" value="Femenino" checked={formData.sexoPaciente == "Femenino"} name="sexoPaciente" id="sexoPaciente" defaultValue={formData.sexoPaciente} label={"Femenino"} inline />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col
              sm={12}
              md={4}
              lg={4}
              className="d-flex align-items-end justify-content-start justify-content-md-end justify-content-lg-end"
            >
              <Form.Label>Fecha de nacimiento:</Form.Label>
            </Col>
            <Col sm={12} md={8} lg={8}>
              <Form.Control name="fechaNacimientoPaciente" defaultValue={formData.fechaNacimientoPaciente} type="date" />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col
              sm={12}
              md={4}
              lg={4}
              className="d-flex align-items-end justify-content-start justify-content-md-end justify-content-lg-end"
            >
              <Form.Label>Expediente:</Form.Label>
            </Col>
            <Col sm={12} md={8} lg={8}>
              <Form.Control name="expedientePaciente" defaultValue={formData.expedientePaciente} type="text" />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col
              sm={12}
              md={4}
              lg={4}
              className="d-flex align-items-end justify-content-start justify-content-md-end justify-content-lg-end"
            >
              <Form.Label>Correo electronico:</Form.Label>
            </Col>
            <Col sm={12} md={8} lg={8}>
              <Form.Control name="emailPaciente" defaultValue={formData.emailPaciente} type="email" />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col
              sm={12}
              md={4}
              lg={4}
              className="d-flex align-items-end justify-content-start justify-content-md-end justify-content-lg-end"
            >
              <Form.Label>Teléfono particular o celular:</Form.Label>
            </Col>
            <Col sm={12} md={8} lg={8}>
              <Form.Control name="telefonoPaciente" defaultValue={formData.telefonoPaciente} type="tel" />
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
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col
              sm={12}
              md={4}
              lg={4}
              className="d-flex align-items-end justify-content-start justify-content-md-end justify-content-lg-end"
            >
              <Form.Label>Motivo de la consulta:</Form.Label>
            </Col>
            <Col sm={12} md={8} lg={8}>
              <Form.Control
                name="motivoConsulta"
                defaultValue={formData.motivoConsulta}
                as="textarea"
                placeholder="Describe detalladamente el motivo de la consulta"
              />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col
              sm={12}
              md={4}
              lg={4}
              className="d-flex align-items-end justify-content-start justify-content-md-end justify-content-lg-end"
            >
              <Form.Label>Padecimiento actual:</Form.Label>
            </Col>
            <Col sm={12} md={8} lg={8}>
              <Form.Control
                name="padecimientoActual"
                defaultValue={formData.padecimientoActual}
                as="textarea"
                placeholder="Describe los padecimientos que tiene actualmente el paciente"
              />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col
              sm={12}
              md={4}
              lg={4}
              className="d-flex align-items-end justify-content-start justify-content-md-end justify-content-lg-end"
            >
              <Form.Label>
                Padecimientos sistémicos de interés para el caso:
              </Form.Label>
            </Col>
            <Col sm={12} md={8} lg={8}>
              <Form.Control
                name="padecimientosSistemticos"
                defaultValue={formData.padecimientosSistemticos}
                as="textarea"
                placeholder="Describe los padecimientos sistémicos que sufre el paciente"
              />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col
              sm={12}
              md={4}
              lg={4}
              className="d-flex align-items-end justify-content-start justify-content-md-end justify-content-lg-end"
            >
              <Form.Label>¿Está tomando algún medicamento?</Form.Label>
            </Col>
            <Col sm={12} md={8} lg={8}>
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
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                label={"Diabetes"}
                name="estadoDiabetes"
                defaultValue={formData.estadoDiabetes}
                value="Si"
              />
              <Form.Control name="descripcionDiabetes" defaultValue={formData.descripcionDiabetes} as="textarea" placeholder="Añade descripción" />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                name="estadoHipertension"
                defaultValue={formData.estadoHipertension}
                value="Si"
                type="checkbox"
                label={"Hipertensión"}
              />
              <Form.Control name="descripcionHipertension" defaultValue={formData.descripcionHipertension} as="textarea" placeholder="Añade descripción" />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                name="estadoNefropatias"
                defaultValue={formData.estadoNefropatias}
                value="Si"
                type="checkbox"
                label={"Nefropatías"}
              />
              <Form.Control defaultValue={formData.descripcionNefropatias} name="descripcionNefropatias" as="textarea" placeholder="Añade descripción" />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                name="estadoTuberculosis"
                defaultValue={formData.estadoTuberculosis}
                value="Si"
                type="checkbox"
                label={"Tuberculosis"}
              />
              <Form.Control defaultValue={formData.descripcionTuberculosis} name="descripcionTuberculosis" as="textarea" placeholder="Añade descripción" />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
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
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                value="Si"
                defaultValue={formData.estadoCardiopatias}
                name="estadoCardiopatias"
                type="checkbox"
                label={"Cardiopatías"}
              />
              <Form.Control defaultValue={formData.descripcionCardiopatias} name="descripcionCardiopatias" as="textarea" placeholder="Añade descripción" />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                defaultValue={formData.estadoAlergias}
                name="estadoAlergias"
                value="Si"
                label={"Alergias"}
              />
              <Form.Control defaultValue={formData.descripcionAlergias} name="descripcionAlergias" as="textarea" placeholder="Añade descripción" />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                label={"Otros"}
                defaultValue={formData.estadoOtros}
                name="estadoOtros"
                value="Si"
              />
              <Form.Control name="descripcionOtros" defaultValue={formData.descripcionOtros} as="textarea" placeholder="Añade descripción" />
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
      <div>
        <Form onChange={onChange}>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                label={"Diabetes"}
                value="Si"
                name="estadoDiabetesAntecedentes"
                defaultValue={formData.estadoDiabetesAntecedentes}
              />
              <Form.Control defaultValue={formData.descripcionDiabetesAntecedentes} name="descripcionDiabetesAntecedentes" as="textarea" placeholder="Añade descripción" />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                label={"Hipertensión"}
                value="Si"
                defaultValue={formData.descripcionHipertensionAntecedentes}
                name="descripcionHipertensionAntecedentes"
              />
              <Form.Control as="textarea" placeholder="Añade descripción" />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                value="Si"
                defaultValue={formData.estadoNefropatiasAntecedentes}
                name="estadoNefropatiasAntecedentes"
                type="checkbox"
                label={"Nefropatías"}
              />
              <Form.Control defaultValue={formData.descripcionNefropatiasAntecedentes} name="descripcionNefropatiasAntecedentes" as="textarea" placeholder="Añade descripción" />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                value="Si"
                defaultValue={formData.estadoTuberculosisAntecedentes}
                name="estadoTuberculosisAntecedentes"
                type="checkbox"
                label={"Tuberculosis"}
              />
              <Form.Control name="descripcionTuberculosisAntecedentes" defaultValue={formData.descripcionTuberculosisAntecedentes} as="textarea" placeholder="Añade descripción" />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                label={"Cáncer"}
                value="Si"
                defaultValue={formData.estadoCancerAntecedentes}
                name="estadoCancerAntecedentes"
              />
              <Form.Control name="descripcionCancerAntecedentes" defaultValue={formData.descripcionCancerAntecedentes} as="textarea" placeholder="Añade descripción" />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                value="Si"
                defaultValue={formData.estadoCardiopatiasAntecedentes}
                name="estadoCardiopatiasAntecedentes"
                type="checkbox"
                label={"Cardiopatías"}
              />
              <Form.Control name="descripcionCardiopatiasAntecedentes" defaultValue={formData.descripcionCardiopatiasAntecedentes} as="textarea" placeholder="Añade descripción" />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                defaultValue={formData.estadoAlergiasAntecedentes}
                name="estadoAlergiasAntecedentes"
                value="Si"
                type="checkbox"
                label={"Alergias"}
              />
              <Form.Control name="descripcionAlergiasAntecedentes" defaultValue={formData.descripcionAlergiasAntecedentes} as="textarea" placeholder="Añade descripción" />
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
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                defaultValue={formData.alimentacionAntipatologias}
                name="alimentacionAntipatologias"
                value="Si"
                type="checkbox"
                label={"Alimentación"}
              />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                defaultValue={formData.hiegieneAntipatologias}
                name="higieneAntipatologias"
                value="Si"
                label={"Higiene"}
              />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                defaultValue={formData.convivenciaConAnimalesAntipatologias}
                name="convivenciaConAnimalesAntipatologias"
                value="Si"
                label={"Convivencia con Animales"}
              />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                defaultValue={formData.tatuajesnAntipatologias}
                name="tatuajesAntipatologias"
                value="Si"
                label={"Tatuajes"}
              />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                label={"Deportes"}
                defaultValue={formData.deportesAntipatologias}
                name="deportesAntipatologias"
                value="Si"
              />
            </Col>
            <Col sm={12} md={6} lg={6}>
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
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                name="tallaSignosVitales"
                defaultValue={formData.tallaSignosVitales}
                value="Si"
                label={"TA"}
              />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                name="temperaturaSignosVitales"
                defaultValue={formData.temperaturaSignosVitales}
                value="Si"
                label={"Temperatura"}
              />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                name="glucosaCapilarSignosVitales"
                defaultValue={formData.glucosaCapilarSignosVitales}
                value="Si"
                label={"FR"}

              />
            </Col>
            <Col sm={12} md={6} lg={6}>
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
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                defaultValue={formData.estadoEstudiosGabinete}
                name="estadoEstudiosGabinete"
                value="Si"
                label={"Estudios de gabinete"}
              />
              <Form.Control
                as="textarea"
                defaultValue={formData.descripcionEstudiosGabinete}
                name="descripcionEstudiosGabinete"
                placeholder="Descripción de los estudios de gabinete (Radiografías, Resonancias, etc.)"
              />
              <Form.Control name="imagenEstudiosGabinete" defaultValue={formData.imagenEstudiosGabinete} type="file" className="mt-2" />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                defaultValue={formData.estadoEstudiosLaboratorio}
                name="estadoEstudiosLaboratorio"
                value="Si"
                label={"Estudios de Laboratorio"}
              />
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
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={4} lg={4}>
              <Form.Label>Tejidos blandos:</Form.Label>
            </Col>
            <Col sm={12} md={8} lg={8}>
              <Form.Control
                defaultValue={formData.tejidosBlandosCavidadBucal}
                name="tejidosBlandosCavidadBucal"
                as="textarea"
                placeholder="Describe los resultados de la exploración de los tejidos blandos"
              />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={4} lg={4}>
              <Form.Label>Tejido óseo:</Form.Label>
            </Col>
            <Col sm={12} md={8} lg={8}>
              <Form.Control
                defaultValue={formData.tejidoOseoCavidadBucal}
                name="tejidoOseoCavidadBucal"
                as="textarea"
                placeholder="Describe los resultados de la exploración del tejido óseo"
              />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={4} lg={4}>
              <Form.Label>Articulación temporomandibular (ATM):</Form.Label>
            </Col>
            <Col sm={12} md={8} lg={8}>
              <Form.Control
                defaultValue={formData.ATMCavidadBucal}
                as="textarea"
                placeholder="Describe los resultados de la exploración de la articulación temporomandibular (ATM)"
              />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check value="Si" defaultValue={formData.estadoDolor} name="estadoDolor" type="checkbox" label={"Dolor"} />
              <Form.Control defaultValue={formData.descripcionDolor} name="descripcionDolor" as="textarea" placeholder="Descripción del dolor" />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                value="Si"
                formData={formData.estadoCrepitacion}
                name="estadoCrepitacion"
                type="checkbox"
                label={"Crepitación"}
              />
              <Form.Control
                defaultValue={formData.descripcionCrepitacion}
                name="descripcionCrepitacion"
                as="textarea"
                placeholder="Descripción de la crepitación"
              />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
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
            <Col sm={12} md={6} lg={6}>
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
            <Col sm={12} md={6} lg={6}>
              <Form.Check defaultValue={formData.estadoBruxismo} name="estadoBruxismo" value="Si" type="checkbox" label={"Bruxismo"} />
              <Form.Control
                defaultValue={formData.descripcionBruxismo}
                name="descripcionBruxismo"
                as="textarea"
                placeholder="Descripción del bruxismo"
              />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                value="Si"
                defaultValue={formData.estadoEspasmoMuscular}
                name="estadoEspasmoMuscular"
                type="checkbox"
                label={"Espasmo muscular"}
              />
              <Form.Control
                defaultValue={formData.descripcionEspasmoMuscular}
                name="descripcionEspasmoMuscular"
                as="textarea"
                placeholder="Descripción del espasmo muscular"
              />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check value="Si" defaultValue={formData.estadoLuxacion} name="estadoLuxacion" type="checkbox" label={"Luxación"} />
              <Form.Control
                defaultValue={formData.descripcionLuxacion}
                name="descripcionLuxacion"
                as="textarea"
                placeholder="Descripción de la luxación"
              />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={4} lg={4}>
              <Form.Label>Diagnóstico:</Form.Label>
            </Col>
            <Col sm={12} md={8} lg={8}>
              <Form.Control defaultValue={formData.diagnostico} name="diagnostico" as="textarea" placeholder="Diagnóstico" />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={4} lg={4}>
              <Form.Label>Pronóstico:</Form.Label>
            </Col>
            <Col sm={12} md={8} lg={8}>
              <Form.Control defaultValue={formData.pronostico} name="pronostico" as="textarea" placeholder="Pronóstico" />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={4} lg={4}>
              <Form.Label>Plan de tratamiento:</Form.Label>
            </Col>
            <Col sm={12} md={8} lg={8}>
              <Form.Control defaultValue={formData.planTratamiento} name="planTratamiento" as="textarea" placeholder="Plan de tratamiento" />
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
          image: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP8AAABcCAYAAAChgGOKAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAGYktHRAD/AP8A/6C9p5MAAAAHdElNRQfnAhAXIhU+SpJbAAAjBElEQVR42u2deZydVXnHv7NlnSSThezrQAJZCNkIUklVmmqroG0tW5EKWkCxioVarS1KpbYotlbFWqy10kJBVGqVpVWDgaYRQhISskACIashCZlksk4ymaV//J6Tc973vnebezN3Yt7f55NP5t77vuc97znPfp7nnCpKxKQZV7k/ZwP/AgwAOkttN0WKCqED+ATw481rv1vpvpxS1Jaxrdn2L0WK0xm7gc2V7kR3oLqMbV1U6ZdJkaIMWAG8WulOdAfKxfyDSbV+il8NPAUcq3QnugMlMX/g708CGiv9MilSlIh9wDOV7kR3oVyafxYwpNIvkyJFiVgLvAzwqx7sg/IwfxVwsf2fIsXpjJ8Dhyrdie5COZh/CDCn0i+SIkWJOAwsrnQnuhNdZv7A329EPn+KFKczNgBr4Mww+aE8mn820FDpF0mRokQ8AzRVuhPdiVKZvwqYT+rvpzi9cQwt8Z1RKJX5B6NIf4oUpzM2Aysr3YnuRpeYP/D3zyZd309x+mMp8DqcOf4+lK75ZyPtnyLF6Yo2YBFnYDFaKcxfjdb3U6Q4nbEDeK7SnagESmH+IaT+forTH8uAbXBmmfzQhZLemL8/scTn7+MMKaJI0WPxJDL9zziUUs8/h9LW9w8CNwGrgJpKD0SKMxKdwM5Kd6JS6CrzV6P1/VKwBXga2FvpQUiR4kwz+aHrzF8Of381MvvPyIFPkaLSKCrgV2Z/fxnaLy1FihQVQFej/XMp3d8/4zKqUqToSegK81cDbyrxuZuBVyA1+VOkqBS6wvxDgQtKfO4LnGEVVClS9DQUzPyBvz+Z1N9PkeK0R1c0/xxgYAnPbCb191OkqDiKZf5yre9vgtTfT5Gikih2nb8c/v4qzN8PXImSkQqSFCmKQ0HMX2Z/fw3Ql/Kl9B4F2k/B2KRI8SuNYjX/hZTm73cCHwKuovStv6qBjcBHSVcOUqQoGsUwfw2l+/tVyHooF35KyvgpUnQJxQT8hgEzK93hAFuA+yvdiRQpTlfkZf6Yvz+h0h0O8CBn0NFKKVKUG8Vo/rnAgEp32LAB+NdKdyJFitMZhTJ/Ofz9cqED+CfSXIEUKUpCTuYPTP6e5O8/A/x7pTuRIsXpjkI1/7n0DH+/GfgCFuFPtX6KFF1Hocw/j57h7/8LWt5LkSJFiSiE+WvpGf7+L4AvY9l8qdZPkaI0ZGX+wN8/i8r7+3uAO4BfQsr4KVKUA4Vo/inAuAr28QRwNzpSKUWKFGVCIcw/F6ivYB//DbjPfUi1fooU5UE+5q+0v/9TZO4fhZTxU6QoJxKZv4f4+6uAP8GOTk6RIkV5ka+q7zxgfAntdwA/Qum4hZbwVqGI/g+Ade7LVOunSFFe5GP+eUD/EtrfB9yJTufpMlLGT5Gi/KjN81up/v4mYCukDJwiRU9DroDfcOD8EttfiVJyU6RI0cOQwfxBsO9cYGwJbXeg/flTpEjRA5FL85fD319V6RdMkSJFMmpzfF8Of3+L+1DMNt0uPlDOrb3zPSsJ+Z7fnf0s9V1yIVf/S4nVFDIu5YgFdfU55Zi3QvrfFdrvSjvxe/Ndn435R1B+fz9fQtHJ47sSOl1F8bv9dsTu7bR/OQcoy+DH+36yreD+pD525Pit0P4XPHbhu3SRKKvRxi2dQFtX2syCXGNTTrhxymg7DyOUOj9ZkfDcscA0YBLQG+WxLMMC45NmXFXIOMf7m0HbsedWx+7tADprs9wwldLy+TuA54LPw4FPo6ShpEGrQoLiWeB/gDdiv90EvIXC9uevsXbuBeqAPwWmoyzB49beCaDF/t9pfV0NtLvBD8ZigT3fDeLrwOeB/bHn/i7wXnu/KrTNmKtHeB/w20X0/0Xg76x/lwIfIEFwGTqBbSgbcqndkxcx4pgCvBMdxTYIaEWW21PA/9pYFYWg/QHAnwGNNjbV6JTmu4HDxbab4zkzUVJYDZrrDhubFiTIDqM9H5cAu4ImqtF28pdQ+PwsBf6RPAIgYYxvBC5HuTN97ft2tAX954GHgI48AqDK+rvA7q0Cvo3mKgnvB95h19YAa4G/B45l0/zzgH4lzMledBKvwwzrcO88930I7dTzccQAoLjD+9DkFIqdaGLGADeTX5DtAb4IfAXTeAEus+c7LEbMEaIaMf4f2OdW/M7CvYCrEXMVCkewAO8Bri3gnj8Gvgl8Djici4ACoqxDxPFJ4JwsbX7fft9doFaK4zK7vy747kVUnl0y8wdYCFyf55o24Hl7L3deZD1wHcUdO7+V4hj/MrQJzbSES2uQsv0KipM9mefZVYjxrwm+W0LA/MGzJyGlOyW49mPAMUg2J+so3d9/lcDfB2aRn/HdQLwNuAcYbN+NpLhdhNrxgmc6cmHyYTjwGeA3YoPX1/oe4nngSOy7QWh1xGEbtrMwsnaSGCsXViCtVZ/w/GwYBNwO/FGui4J3q0Ga8qs5+tcfCYfriul8bPu3W4gyPpT/hKVaCmPeWuBi4K/xh8+Morgs1jaiii3X+wO8GxWmTSM3hgIfoTClGxc82azCa4gy/v8h6wJIZv4RSFOXgpXAQfu7BlkSIQ4g0+81kqX/W9AkgQjzrCKefQh4yf6+EGne8LlvkMm8IGK4MjYmo4gydRuwPOHe0USXRV8CdtvfE62dQtGCT2seS5Qx263dV9HeBnErpRpZCUMKeM67kFZw5udRlIr9z0QFN8gd6MqJzlfi5/FUYhgS9A5taJ6bEsYI4NcRbYCYY1gRzzpI4VvGz0MWzujgu040d3uyXD+xlIEIBM84vCUKcnm/jqxyNq/9rg/4BTedh8zlriK+vj+UqDA5DHwYmfdV9tvdRA8A7Q2cbX+fD/SJPWM3tntvDM6f3IKYfk7wWwtwK9LcI5AffQ3RMwNnIQ3q/PnzkOXhsBf5TPExm0KU4VbiXYPpZG6Bthf5eUn93xn8No2o4FuGXKO9iGnfi6oew5Lr0YiY9+WYo0HItRpknzuBLwF/g4jkOrRlmtPYrWTXLhHEiO9DlO9MxlzPmkzUtXsOHePWiWIBn0KmtUN/YDaKyZxPVEGAYgKvJTyyGgnebQX0qQG5YI3Bz0eAr6F4UD3wt8Dbg98HIdpcX4bhuYqoQPwZ8OPwgiSfvxz+fpjL30jUrNpiHXFBvR1oAuKn/zrTMOlU4G8j0y2JsNqRFhuPmNdhN/LXt6LBXYUYe2FwzSDEqI755xB1VzYB24F4UHAGUUZZEdyTVBX5CPKDkyLMHdZ/0F4Kocm8BB8LAQU1LycaD+kkfyR6Fl7zgXzARYjxQcR9Inj2SxTI/AGux68YuSCoe99aumZJZMMFRAXscrxpvgrR5ENEz5kcbn1Ioq9vIh89F33lw9VEGfsECup9EU/bf4/clTr7/RCZ8aSCEdDjGOAPg58OIqFzGLzFEmf+U+HvX4DXMKBTeuNaKW4WH0EMOoioxAaZcSvJPwGTY+1uIrqKsB8FV0Lmr8YTaC/EfCFWoAmK+3XhsuhuvNvRn0wXqtPayRfs6hN7vgtWhRiMj404bCbZpAxxDlFroS8yhZ+xz1tRhL4GMW6+IBSxMTmPaPDtWTSPrq+9KP6Q2GyoImrhdZKZXLYUWVNx93MwUbcOvPAuhMGzvf8IFNkPhccPUFAvjHc8B1yB5vYYovtXyjAmv0dU6/8I+Hn8otpYp0dRnvV95+9XkTngzwYD0Ns6Go9mL0GE3khmpL6JoNQ3By4gasG8SOaE7sIvgYA0n9N+Z5EZpBmAJivUWv2QCemwEZnuIMuiMdbGAaLaOxvi8YY9RIl6BPLZQ+HYgayKg3nabkNMEloetyKh/B9IeH89flOBCShuada99260G9NfFfDOXUEDUZptxugjsM6OYb5ugCOItuL0tRcvvLMij7+/kKjFtwf5/ic3pbF+NQM/KfJ9O+19smEUcAOeRt9Ay5Kt8X7Hpe9USvP32xFzOzQQNavakCb8YyR1LwTeStRkc8tuR5AGiWu2o2iyxxEl3iq7ZxkyoUKG7CA51bg61sYeTLMjPz4+Fn9I1JxyCCX8C3ghM5nMYOVRe68hCf1vsf63IMYP4w0dwO/b/ePQqsgsooLoJ4h58+FFRBTDg++GIQK91tp5DAnyTigqwedCooGmHyFBXlbfPxZbCFeDdmAJMzHEXaztaI4bYt8fRTQ7icz5OWTvkss0r0VLeyFvPUnUFSwlYaoTr6CS8G6iPPcw0ZybSEdDzMNHf7uCvUSZbIINYvi8G3PcfwgFsNya5QUJfZyANEkcNchiuByZ26HZ00wQqAswkijzvIJn3Flk1jbkI+B2oqsBScHKkcC3Eu6ttrF7J2L+ObF7x6KAXDasRAlNhRxo8iLwHWTah+gF/Jr9u9l+fyDPO8fzBm7BL6/ut+e0UnwGXaGYRjTYup7MY9v7EhXCR5B7+g4yYw+NWd65BsWMfofczD+aaDylDXiC7tly/iwUyHbvtBUtM3YkPTtkrF6U7u+/QjQSej6FLTuBfPI78euQvUgOllWTPWdgE/KlZxMNMm4j2FfAiLWKTLP+eSRZk5YnC0G4GlDdhf5vQYKqlsx4Qza0o6zIT1KYO+Tu+QLSejeQuQ4PMh/vRJbIxgITfN6KmMPhcaR1pue7sQTMItPyaocMdza04nag5bakYF+u+XmF5GXiEPFYUxMxxZOUalwmofAeonTzr+SgiVDqjaT0SToZEDPMjT0jW8T4YaSxH8DHA4baQBaDVfb/NKLuwjosgh/bnzAMFO3BuyxD6Vrs4+RqAGKsqUXevxppiuEUNhfNSNtfS0BgBRLSPpTk81GSrSLQcuvCXI0E49kfuXMuuNuMLJx2stRVlAF9iDLwMZJ3jZpLdC3/F2icp1AcCtmRqpForGkvgTUWjFctgWU3acZVpRQadaKVjPfjBeE6ZHXhnh1HbSyffzRdRzvR9f16on43aAnlAFrnD/38pCDLpIT+vIGy/5pILhRx7sJsokJnJZnLX5cSXQr8P3xW3iSilsNee+7e4LmdKInlHcF1q/HBtjFkZo41o/X010k2g120fTJRTbXHnn8pqhFwqEWT3Oy+KLJ67SgyC59AAuTjZGZEnktheCfRpa3lKKA61t7lVKz3jyDKwLvJzJ/oi2Il7vmtKA4xhsxVpt02zvtJpq+fZRvjACNjn1tJTjRagATvIyjGsg8KLuyJox0pz4uCvt5Hnl20QrO/HP5+GMWOZ6cdQcGoZ5CW+Ejw22VoGeTV4LtpZCbHrEfrlbminX2JmtstaHkxxHik9Zx5dwx4EB9IiS9PrkNpsPHnhozYSdTfTwpWvobW5g/kGctZRJfiNtp9P0CBOOeu1KP15EVARx6iqbf7nIl/Amn8o8hauRsR6RfJ4p/nECJDkNYPYxRzkVDBxnlgkW0WUptwNlFme5Vo0Q42Pr8ZfF6BlMQ1ZJ5HsRbRV5fX2hPa7IUJnlja+M2oGOxdSGn+CUY/RboFnchSfTt+bpchazrnGDvm74WXGl3FK0SjrPHstNfRGjSI0a7FR1rH2fND5p9JJhG+SG7GBxFDqA12EV07HYWkexjfWIxfcklannzBPTcw3YYTtRz2ExV+M8kMVq4jP+NXJzzfvfdm4IdEYxVvtnf6ZZ52G5GWGWqfD6MMwaXBNcuRsAzN1k12TyjIOtF8uuDoFdaPEEk5CEkYRmbEfTdR9zEbZsX6uobocu67UJadU2on8NbnrIT2VpOH8QvQyvH7xyBLzuVe9Eeu2u/a515obo4jmgqFZCdaNs5VVdmBlJCj51a0TBvmtNRZP0J6bHMfRlN6Pn+Svx8GkjYEA+ACgw322QXYHgwGKKk/222AkhJEDiDr4lyipus269cQG6BPosCUwz5kiru+DyLqR7aTmVwDElihW7IFL9yyBSu3Wt+STOBDQT/DeEMnvgINxKBh9t1YRFy/zGMyHkCE4jRTPXIjQuY/m6j2fgNpkXsQgbXhl7zeh+Z8DKWl8f4lSkV1pnErWhF6Ks99NWQm97yMrIzR1ubHidLCfyPrqT+Zwd5OFAjMR1/5ED9nogGtYH0Nze0VyFUMU4rvR4rvO0RLdfchCyVXILfG7nHj/xTwX7FrzkOB9AZ7z2rgJfeSUymu+CSONhREcYhnp4GkqjOrDyJGCBlkCpq442jC4skxnagc8QMk+2OfQNHl+BLZNOBRxNRnEzXLOpE5H2Y/TYg9ex/J+fznEdVYa/BpwUNJDiZ9EPmfSWb1nchUayS6bn2Q6ORvwQsJECFPRtZLLuxCFkS49HoTvvx6IjI9w1jJf9k8zSVqXm/DL6ddR1SLLieaQ96BaOt6MtPG+6H5CttuIjMhJwlDyFQQtyChNMbGMHyXzcgKOGTj1ZjQ5m02JvH5abff/qeAfq1HQiJcJn4HUji1ZArJFcA3EH3OIsqHR8hdo+Hg2jyM3MO41TQZ0Wv47Ocd888jcz26GLxB1ORNqoYLyyBbyZSQIxAxHEexguGx36vIvqHoQWRVVJMpdM4ie1XgA8A/EA0GxpcnX8OWLxPy+UPiWh60M4FkYToqy/fH8FbRTKLxhu14iwJEDAdifSxEcB8HvocCc85qGIdMxMNo/kNttAZpfFdsEmK79XcyEmgOLSh//Yex62eg4KhjfkeEg8kM6u4i028/iWD840KyiuynSzWh4h4Xk5lMZiVfLvraT9SMzoUX7V+8mjFp+XAXytLcjug2TqdbKW7368ewoGQMZ5MpdNZWo0m/MF+rebARv8QFmdVwTWRG8+PSaUAwQOdTXPBxG2KQQpcrjyCiv51MH3weUaZeTeYE9CKqdQ4RXQaaTpYAVxbsxMc75hHVPC8TTVo5RqYPWIhvDYpy/2fsu2rra8j461AkeiOyFBpi92xGwuRGokHdJSSfplwTe6fe9p2rQAyxlfxxEZDF0FDAdRvQ6tIjwXczKWx/ibBP2wq8dh+KKxzPc90O5Ja4WNNEMgPcr5Hs7ydZjk2Ipo9DRmwivmR+HFhfjd9TrBTEC1XilsQ2e9mwU/EX6BfcM5visBGZijOImrUhOtHEPI7ST28jU5oPIDPYllS/P4xosC9kXhBhFpPR9hoKcjWQ7C6FS0XOZwsxiBwIxvwQCjb9G5nC1wWXvon80qft+8lkMspGZKJeH3x3ApUBH3LPjM11qHmcxXlOQt9fIz/jVKMsxGxoRfPxdyjd9XvBb/FYQSHYQOa2bbnwELKAktyXQ0hDXwOEHHoumbGGbEU+SUuH3yXqejv0I9MFPQJsqkXBrVL9/XB9vwpZAS7BowZlecWJbSliNlfu2WTX1OHz4wvZJLEaBXLcwH7F2uuHz/dvQb7yamSBRAp8AnO+DvnO6xAztOKZIEQV8ocH2N9r8IKkFvl97v3zwaWNHkca+Gf4nPqkiroWRFxj7fcatM9eodiOAnTfQabpCGtzI0py2hDr9za0wUc4Fz9FbtkP8fvy7SB79d9eVIbt4i37bF72IGHjEoCqiNWcZ0EdIvTd9v59bfyOISZ9CSV8bSMzuagOCfRmCqevxylgLgM6Oo5q9Z9Eq1iTEF3sRLyStBvUJqI000H2OM7PkaJ0vHMMFe8kpRDXoCDgxuD6PcCmqkkzrvoHVNHVVexCUePQrHe75eYaoIojHKSevk13oeNWytbPRSLnHJf6zALW+Itur6du1V1O2itm7GuRv3+MrqVf1iCttz32/alI5SwLzuQzAwshjCIIrcfOcfxdu7vNfGPYU2iwatKMqxagYE9XJrMKaf6T9dMpUqQ4PVBLcf5iihQpUqRIkeJ0xqnaYOEkekpwryejJwVBU3Q/KuUul3MH1VIRCqKBZCY89FTUk1nJVRQqwPh9UGJQOcts+5M8Z/1Q/sKpUjRVWT7X2jsWk8xTSPtdvcbB9atXEfecEpRrB9V86I2SS6ahwGITKu99Dn+O39Novf5DKBW0DZ2icxSV/7oBdnvdfR0Vm8ywNg+gteQXUI56nX2+DaWxdqC13X9HSUm3W1tfRkzg0ixXoVNv/snuuxK/b9oidHxVK0qvvRGVI3egwo3vI2K/HSUBddozv40vzrkY5aAvJdhiyfBWlC5bZe+/FKUgt1mbM/Dr6q4Mt9nufRdK3b3bxuUilLq8BlVQTrB3vRhllk2w/n4B7eYzHtU5uE0+QPkEH0O1Cl+1sZlufdmF31bsBrQRay+0Vu2OKvt9lCs/2MbzW/jA8iS0TZgbz5vwGYjTUQLRfahOfVYwlo+gsvBG68ejNi8zbVy/iRLOPoUSplbY3F5lY+LW0WvsfZ4ymutjz1hrz60xmn3F5s9tTHqJzfUylB/zabSe/0TQ7i02zq5A5w201fxwe+c5aK3/k2RuOdZtOKXMH2i08TYgYR73RYhYr0S14M/b4N6D10jvRUkb8eOiXC78h4mmto5GzH4zyjjbgCY2zCIbjyb1ZjQxD9rvH0GptMsQUzeg5JHLgnuvQMzxLCKAcKPKMfYOU4E/J5qePBrVldchonw3yuh6iGjq8BVEzwW8Bn+A6YeJ7jS7HwnQZiQMrkEE/gwqfrrIrr8B7fAyx/p+Gz7dcxhK2LkBVTxOBO6yeRiK34J6gI3zB2ycbkCMcx8i5luCfjWiJJpG+73Bvr8eFS65ZK8FNjdvQgzwG6jufj6q1fgo2k78HKKp0guMLu5CW4Z9z/p6r439I0gAuhr+ySiF9oNk7s7UiHJUwg1ZOqw/c4xGPmbfzwY+ixj+x0YnCxHthjshTUZMHW7Gstje4R/xFaWTkWBfTIXQXWb/bCT19hA9xmosmsxmlCF2HdIC30CFP8eRRH4dab9Wu+4pZGb2QwzgsvAakJYYj6TtdMTYKxDhtaK8ht9DDNmELIb5iLi342sD+uJTeB9D6ZP9EeF/CjH+fqRdH0eTfQ6S+DVIW7gqsLNsrC/HE5rLb3dwJcfukM8nkCadh69860ACaiXaechlFY5AWq4JuSAu334u2uV3KtKGCxDRrbf+DQR+CzGBO7p5ss1Lq/1fHzzjzUhAgTLGrkAMvBhZaTvsXReiUt2DeMtlJT5t1x026ehgavCMqxFTuzTcgUizf9XebzzS8vNRzv1aG6OL7Rlj7Z0XIavgGL5gzFXINaE04uVGLy9ZPw/aPE2xNg7YOFcjJh9l7+KstUus3Q3BPM6wudpr7a9CZcRzkDBbhtKr2yn/mYVFobuYfwGyMu5EjLcDpTe6Ahm3A4ur+jqEzLdH0c4yNyFTfykirBsREWxDpbwud3sNSlfujZgkrMsfhjRvG772YIO1++vI5HsVTXy7XTcaEcCd6HSVo2jHlJutzXuQiewOYxiOhMsmRPyPBf0ahDIpXT18HOciYbMRaec7bYwmIO3kTnVZYWNyLb76bQZi4FcR8bsNO9wJtKPsXZuD8X0albgOxBfXrLP+97Z3GI53t+rsvd21e9A25htsPu6y+WpDDO12YhqOBOff4je6GIYvJjtB1DIbQ7REuNXG91Zk1XTYOw5HjL8PXy67xJ5Za++wBVkBTxjdPWL3fxoJsmXWl/ut/3utvf32jPU2HwuRQHImeidSBHPQJiphXcdsJLh2WH/vRRbQUDy/bUHu1stUEN3B/EOQaXcIDfYLSGPtRNp2Asq534CIpC8yJacG1w5Fk+pyzzuRhh6MhMRnbCAfxp/Wuhtv5s1FE3gCmfmuXHgNshYuQlq/HTH8Qfu+H9IQryKB0d++b0CVbW6rpPMRsY1HwmMEii3caf26D5nlb0IEuiFh7N+EmHUVIsCJNhb1+F2WeiOmvwuZyc5/fjMSpBuDd26z7y5FxPgCsqg2WHuft+9GIgZ3VpUrRd1K9NDIKfZMkFDqQBbGo3jib7Fx/0kwv28n8xTgafh6+shGltaXcGx2ISZ0DH3U5qgelc72RcrlBNLSqxHzXoKE1WZrY489cx/Kbdll/ahBFtnDyE36ZxuLemuvCgnjgygm5SykRrwV5cqx++ILs2bZfW6/ymeRoJhv379E4WXCpwSnjPljh1iei4hpCyKGKTawZyMGewn5ZE8hhjlg1zmz+y32v9sTwB0m2omCW72QWdaEtH2TvdsEFLD5DCICdwzYRMToaxEjTLa2xyEiO4AvSV6OBNj1aOKd6boTTfpcRGQtSEiNRIT4NuvDLUjwfdjum2rjEZ6YU4c/b28JYpo/svsP4ysVtyHG2o6v7OqH30JrD2J+Fyxss/dxOwJPQVbUEqTZbsNr2f2I4C+w/h4mWpY9EB/H2G1jXIffa2AqiuGssfH6Eb7KLF4WfDG+qKs3uelwnb3321Al30Z8DGCNjeVM/OGWs5Bb9jLRHaEm2HWbEBO6DWdakCKZjeIfX7Ax7LBxeg8SoA14f70TKYNBRh/OohljbbUiAeOKtGbYHN1un+vpntOLc6I7NP+voYl2wa6voQH/IZKCh5EE/AxilBX4jTmqkFk2H5lkboKdafopJI3rkGS+EBHsDqSF++BN3b6IGBrt/1Y0AXcg6f8sfjOINnyl43i0//mFSCg8ZPc2IrP/QcRUa63dWjTJP7F+HUPCwZVVjrLx6IMPuI5DJmQ7IqoHkPB7BTGZM7V3IcvgDhRnADHWDHvPGutvE4qau1rwZkToX0KCz43jALzJXYf897MQ49STucHLAevjJvxJxC5I+zDSpO78hcEoun/crnX18H2Qm0Xw2VV1JmnCenvfbyCmfwjvc8+2Pg9AsZ/pdu1OfIWha9PFTdwOy6ORwHrcaA/rR18kAHdYn261sRmEVzi98cL6EuSWfAwx+Ehknay3Z91v/bzL6Mr1qwUqmxJ/qpf6qvHa+1z714EmaBNiqJ0oSv48PtjTB03Ky0gKT0IaYDsi8IsRQT+DiPmd9hwXONqG93svxPuXLyP/b77d8xf2/f8iAnWnCTUhRh5ENBJ8P/Ihe1tfnTY/iNyPq+3eJdaX30JLcO9FTPAle4fbkbXiNP84RMA1SOODhMZX7N3bba7m279pyPw/iD8SbAPehF6Hyj43IU24BS2p3YECfTWI+L6FiPf9SFu73YEewwvCZkT8vdDS7EIk6BajoNrl+M0j/xu5br+DLKUr7TknT4hFgszlA7Qg5pyILK/NaMViIL4cfAE+OPh9JGScRXKH/f+8zc0sa/sR6+8W/BZtro9uyXWatfOs0dFhJJhnIov0aaS45qPy7UXIyny7PcPtObHQ/m1CiqsWWQkuLvQaEgJ1SFHUIkVWyJZgpxSnmvk70OC/FV8E9BAiwJHIDF9tA3c7koxz0QR9zn4/Zr8vRppnIL6G/ZdogjchIv0F8j+ftLbcWjtIINyDCOUT1rfz7N7PIvPt2yhA9jnEvLfY/QeRJr0Xmce3IMl+tf32DUQc70OE9DpyczYhE3o7IrLPI4I/H2lrZ7qvRJbQpYjoX0f19g8gDTUdWQ4dNmdv4N2PDcgaWI6Y41Lrw4v2vLvt85eRRXWrtXM/0paPImF1ExIii+w9Z9r4LEIuQg1iiEnIZTuMF55TbOz/BlkrX7QxOoKEYngY5U5ksd1r7S2y63+GIvrr0XLiThQ7qUWa9Kco6HoYCYA5No5ub77d1t6XkNDZjTbzcPsfHra/3Zl5Y62vy5DAXo/ciHq7dxESBitR8HatjflYm5/diLHdngqr8DtKuSj+CaRwFqODSj9o9PB1ohunVgSnLL03dpLLQMRER/CR7jqknVvw2zb1tWub8cTdC2kkd2+N3deGgjeufXfQQgPeBHYaphNNfrjbUD+77xB+Y4WB9v1epEHd/eEyUTh2w5Dpe8CeN8yubQ761WJtHcUf6NFg77UXb8IOQRZFfJyq7X1DQX00GLM6u9dt7zUkeFZ87LC23K5GIQZZP/fbO/VGpvsRe4Zbmhpg97r56YcYZj8idtfnITZHzQnk4eb+iD1rcDAPfWx8nOZ3wcj9RBOi+lqfw/kjoI8WoqsqDfZOTdYvN9dN1u5Q6/8Je8eD+BhHk41Zvc3rQbyl5uDK4sP8jg4bqxPBPDp6ASpr9p/S3P40Xz2FQ6U3Q+mJSEvgU6RIURH8P4O/Pc+c6RL5AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTAyLTE2VDIzOjM0OjEwKzAwOjAwlWABYgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0wMi0xNlQyMzozNDoxMCswMDowMOQ9ud4AAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjMtMDItMTZUMjM6MzQ6MjErMDA6MDCb0JRWAAAAAElFTkSuQmCC`
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
