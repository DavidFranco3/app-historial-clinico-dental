import React, { useEffect, useState } from "react";
import Autenticate from "../../layout/Autenticate";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Container from "../../components/presentational/Container";
import MultiStep from "react-multistep";

const steps = [
  { component: <StepOne /> },
  { component: <StepTwo /> },
  { component: <StepThree /> },
  { component: <StepFour /> },
  { component: <StepFive /> },
  { component: <StepSix /> },
  { component: <StepSeven /> },
  { component: <StepEight /> },
];

function StepOne() {
  return (
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
            <Form.Control type="text" />
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
            <Form.Control type="number" />
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
            <Form.Check type="radio" name="genero" label={"Masculino"} inline />
            <Form.Check type="radio" name="genero" label={"Femenino"} inline />
          </Col>
        </Row>
        <Row className="mb-2 mb-md-4 mb-lg-7">
          <Col
            sm={12}
            md={4}
            lg={4}
            className="d-flex align-items-end justify-content-start justify-content-md-end justify-content-lg-end"
          >
            <Form.Label>Fecha de nacimiento (día-mes-año):</Form.Label>
          </Col>
          <Col sm={12} md={8} lg={8}>
            <Form.Control type="text" />
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
            <Form.Control type="text" />
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
            <Form.Control type="email" />
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
            <Form.Control type="tel" />
          </Col>
        </Row>
      </div>
    </div>
  );
}

function StepTwo() {
  const [valorSeleccionado, setValorSeleccionado] = useState(""); // Estado para almacenar el valor seleccionado

  // Función para manejar el cambio en la selección del radio button
  const handleChange = (e) => {
    setValorSeleccionado(e.target.value);
  };

  return (
    <div>
      <h2 className="titulosMultiStep">Interrogatorio</h2>
      <hr />
      <div>
        <Form>
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
                type="radio"
                name="medicamento"
                label={"No"}
                inline
                value="No" // Valor asociado al radio button
                onChange={handleChange} // Función que se ejecuta cuando cambia la selección
                checked={valorSeleccionado === "No"} // Verificar si este radio button está seleccionado
              />
              <Form.Check
                type="radio"
                name="medicamento"
                label={"Sí"}
                inline
                value="Si"
                onChange={handleChange}
                checked={valorSeleccionado === "Si"}
              />
              {valorSeleccionado === "Si" && (
                <Form.Control
                  as="textarea"
                  placeholder="Describe los medicamentos que toma el paciente actualmente"
                />
              )}
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

function StepThree() {
  return (
    <div>
      <h2 className="titulosMultiStep">Antecedentes Heredofamiliares</h2>
      <hr />
      <div>
        <Form>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check type="checkbox" name="diabetes" label={"Diabetes"} />
              <Form.Control as="textarea" placeholder="Añade descripción" />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                name="hipertension"
                label={"Hipertensión"}
              />
              <Form.Control as="textarea" placeholder="Añade descripción" />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                name="nefropatias"
                label={"Nefropatías"}
              />
              <Form.Control as="textarea" placeholder="Añade descripción" />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                name="tuberculosis"
                label={"Tuberculosis"}
              />
              <Form.Control as="textarea" placeholder="Añade descripción" />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check type="checkbox" name="cancer" label={"Cáncer"} />
              <Form.Control as="textarea" placeholder="Añade descripción" />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                name="cardiopatias"
                label={"Cardiopatías"}
              />
              <Form.Control as="textarea" placeholder="Añade descripción" />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check type="checkbox" name="alergias" label={"Alergias"} />
              <Form.Control as="textarea" placeholder="Añade descripción" />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Check type="checkbox" name="otros" label={"Otros"} />
              <Form.Control as="textarea" placeholder="Añade descripción" />
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

function StepFour() {
  return (
    <div>
      <h2 className="titulosMultiStep">
        Antecedentes Personales Patológicos (A.P.P.)
      </h2>
      <hr />
      <div>
        <Form>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check type="checkbox" name="diabetes" label={"Diabetes"} />
              <Form.Control as="textarea" placeholder="Añade descripción" />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                name="hipertension"
                label={"Hipertensión"}
              />
              <Form.Control as="textarea" placeholder="Añade descripción" />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                name="nefropatias"
                label={"Nefropatías"}
              />
              <Form.Control as="textarea" placeholder="Añade descripción" />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                name="tuberculosis"
                label={"Tuberculosis"}
              />
              <Form.Control as="textarea" placeholder="Añade descripción" />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check type="checkbox" name="cancer" label={"Cáncer"} />
              <Form.Control as="textarea" placeholder="Añade descripción" />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                name="cardiopatias"
                label={"Cardiopatías"}
              />
              <Form.Control as="textarea" placeholder="Añade descripción" />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check type="checkbox" name="alergias" label={"Alergias"} />
              <Form.Control as="textarea" placeholder="Añade descripción" />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Check type="checkbox" name="otros" label={"Otros"} />
              <Form.Control as="textarea" placeholder="Añade descripción" />
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

function StepFive() {
  return (
    <div>
      <h2 className="titulosMultiStep">
        Antecedentes Personales No Patológicos (A.P.N.P.)
      </h2>
      <hr />
      <div>
        <Form>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                name="alimentacion"
                label={"Alimentación"}
              />
              <Form.Control as="textarea" placeholder="Añade descripción" />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Check type="checkbox" name="higiene" label={"Higiene"} />
              <Form.Control as="textarea" placeholder="Añade descripción" />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                name="convivenciaAnimales
                "
                label={"Convivencia con Animales"}
              />
              <Form.Control as="textarea" placeholder="Añade descripción" />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Check type="checkbox" name="tatuajes" label={"Tatuajes"} />
              <Form.Control as="textarea" placeholder="Añade descripción" />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check type="checkbox" name="deportes" label={"Deportes"} />
              <Form.Control as="textarea" placeholder="Añade descripción" />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Check type="checkbox" name="vacunas" label={"Vacunas"} />
              <Form.Control as="textarea" placeholder="Añade descripción" />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check type="checkbox" name="alergias" label={"Alergias"} />
              <Form.Control as="textarea" placeholder="Añade descripción" />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Check type="checkbox" name="otros" label={"Otros"} />
              <Form.Control as="textarea" placeholder="Añade descripción" />
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

function StepSix() {
  return (
    <div>
      <h2 className="titulosMultiStep">Signos vitales</h2>
      <hr />
      <div>
        <Form>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check type="checkbox" name="ta" label={"TA"} />
              <Form.Control as="textarea" placeholder="Añade descripción" />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                name="temperatura"
                label={"Temperatura"}
              />
              <Form.Control as="textarea" placeholder="Añade descripción" />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check type="checkbox" name="fr" label={"FR"} />
              <Form.Control as="textarea" placeholder="Añade descripción" />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Check type="checkbox" name="peso" label={"Peso"} />
              <Form.Control as="textarea" placeholder="Añade descripción" />
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

function StepSeven() {
  return (
    <div>
      <h2 className="titulosMultiStep">Estudios</h2>
      <hr />
      <div>
        <Form>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                name="estudiosGabinete"
                label={"Estudios de gabinete"}
              />
              <Form.Control
                as="textarea"
                placeholder="Descripción de los estudios de gabinete (Radiografías, Resonancias, etc.)"
              />
              <Form.Control type="file" className="mt-2" />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                name="estudiosLaboratorio"
                label={"Estudios de laboratorio"}
              />
              <Form.Control
                as="textarea"
                placeholder="Descripción de los estudios de laboratorio (Análisis de sangre, Orina, etc.)"
              />
              <Form.Control type="file" className="mt-2" />
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

function StepEight() {
  return (
    <div>
      <h2 className="titulosMultiStep">
        Exploración de la cavidad bucal y anexos
      </h2>
      <hr />
      <div>
        <Form>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={4} lg={4}>
              <Form.Label>Tejidos blandos:</Form.Label>
            </Col>
            <Col sm={12} md={8} lg={8}>
              <Form.Control
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
                as="textarea"
                placeholder="Describe los resultados de la exploración de la articulación temporomandibular (ATM)"
              />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check type="checkbox" name="dolor" label={"Dolor"} />
              <Form.Control as="textarea" placeholder="Descripción del dolor" />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                name="crepitacion"
                label={"Crepitación"}
              />
              <Form.Control
                as="textarea"
                placeholder="Descripción de la crepitación"
              />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                name="subluxacion"
                label={"Subluxación"}
              />
              <Form.Control
                as="textarea"
                placeholder="Descripción de la subluxación"
              />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                name="anquilosis"
                label={"Anquilosis"}
              />
              <Form.Control
                as="textarea"
                placeholder="Descripción de la anquilosis"
              />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check type="checkbox" name="bruxismo" label={"Bruxismo"} />
              <Form.Control
                as="textarea"
                placeholder="Descripción del bruxismo"
              />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Check
                type="checkbox"
                name="espasmoMuscular"
                label={"Espasmo muscular"}
              />
              <Form.Control
                as="textarea"
                placeholder="Descripción del espasmo muscular"
              />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={6} lg={6}>
              <Form.Check type="checkbox" name="luxacion" label={"Luxación"} />
              <Form.Control
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
              <Form.Control as="textarea" placeholder="Diagnóstico" />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={4} lg={4}>
              <Form.Label>Pronóstico:</Form.Label>
            </Col>
            <Col sm={12} md={8} lg={8}>
              <Form.Control as="textarea" placeholder="Pronóstico" />
            </Col>
          </Row>
          <Row className="mb-2 mb-md-4 mb-lg-7">
            <Col sm={12} md={4} lg={4}>
              <Form.Label>Plan de tratamiento:</Form.Label>
            </Col>
            <Col sm={12} md={8} lg={8}>
              <Form.Control as="textarea" placeholder="Plan de tratamiento" />
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

const Registro = () => {
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
            <MultiStep steps={steps} />
          </div>
        </div>
      </Container>
    </Autenticate>
  );
};

export default Registro;
