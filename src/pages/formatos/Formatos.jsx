import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Autenticate from "../../layout/Autenticate";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function Formatos() {
    return (
        <Autenticate>

            <div className="container mt-3">
                <div className="card text-center mb-3" style={{width: '18rem'}}>
                    <div className="card-body">
                        <p className="card-text">Formato Responsiva</p>
                        <button className="btn btn-info" onClick={FormatoResponsiva}>Descargar</button>
                    </div>
                </div>
            </div>
            
        </Autenticate>
    );
;}

function FormatoResponsiva() {

    const docDefinition = {
        pageSize: 'LETTER',
        styles: {
            normalText: {
                fontSize: 12,
                lineHeight: 1.5,
            }
        },
        content: [
            {
                margin: [0, 5, 0, 15],
                layout: 'noBorders',
                table: {
                    widths: ['15%', '70%', '15%'],
                    heights: [60],
                    body: [
                        [
                            {
                                alignment: 'center',
                                style: 'header',
                                image: `data:image/png;base64,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`,
                                width: 50, 
                                height: 50,
                            },
                            {
                                alignment: 'center',
                                width: '*',
                                stack: [
                                    { text: 'HISTORIA CLÍNICA ESTOMATOLÓGICA', fontSize: '20' },
                                    { text: 'Unidad Médica: Consultorio Dental RH', fontSize: '9' },
                                    { text: 'Dirección: Calle 2 de Abril No. 5, Col. Centro, San Juan del Río, Qro.', fontSize: '9' },
                                    { text: 'Estomatólogo: Sandra Angeles Ramírez', fontSize: '9' },
                                    { text: 'Cédula profesional: 2926159', fontSize: '9' },
                                    { text: 'Teléfono: 4272729318', fontSize: '9' }
                                ],
                            },
                            {
                                text: new Date().toLocaleDateString('es-MX')
                            }
                        ]
                    ]
                }
            },
            {
                text: 'Nombre del paciente:_________________________________________________________________________  Edad:________________', fontSize: 10, lineHeight: 1.5
            },
            {
                text: 'Registro:_______________________________________________________________', fontSize: 10, lineHeight: 1.5
            },
            {
                text: 'Autorizo al Dr./Dra: ___________________________________________________________________________ para realizar la operación o procedimiento ______________________________________________________________________________________.', fontSize: 10, lineHeight: 1.5, alignment: 'justify'
            },
            {
                text: 'j', color: `white`, lineHeight: 0.5
            },
            {
                text: 'RIESGOS EN LA ANTENCIÓN MÉDICA, ESTUDIOS ESPECIALES Y PROCEDIMIENTOS QUIRÚRGICOS.' , fontSize: 14, alignment: 'justify',
            },
            {
                text: 'j', color: `white`, lineHeight: 0.5
            },
            {
                text: 'Se da esta autorización bajo la comprensión de que cualquier operación y procedimiento implica algunos riesgos y peligros. Los riesgos más comunes incluyen: hemorragia, lesión nerviosa, coagulos sanguíneos, ataque cardiaco, reacciones alérgicas, neumonía e infecciones. Estos riesgos pueden ser graves o incluso mortales. Algunos riesgos importantes y sustanciales de esta operación en particular incluyen:' , fontSize: 10, alignment: 'justify', lineHeight: 1.5 
            },
            {
                text: 'j', color: `white`, lineHeight: 0.5
            },
            {
                text: 'ANESTESIA.' , fontSize: 14, alignment: 'justify',
            },
            {
                text: 'j', color: `white`, lineHeight: 0.5
            },
            {
                text: 'La administración de la anestesia también implica riesgos, el más importante de estos, aunque poco frecuente es el de sufrir reacción a los medicamentos y que puede causar la muerte. Autorizo el uso de estos anestésicos por la persona responsable de este servicio, en caso de considerarse necesario.' , fontSize: 10, alignment: 'justify', lineHeight: 1.5 
            },
            {
                text: 'j', color: `white`, lineHeight: 0.5
            },
            {
                text: 'PROCEDIMIENTOS ADICIONALES.' , fontSize: 14, alignment: 'justify',
            },
            {
                text: 'j', color: `white`, lineHeight: 0.5
            },
            {
                text: 'Si mi medico descubre algún padecimiento diferente y no sospechado durante mi cirugia, le autorizo a que realice el tratamiento que considere necesario para este. Estoy enterado(a) de que no existe garantía o seguridad sobre los resultados del procedimiento y de que es posible que pueda no curar mi enfermedad. Nadie puede predecir cuales serán las complicaciones que ocurran en mi caso.' , fontSize: 10, alignment: 'justify', lineHeight: 1.5 
            },
            {
                text: 'j', color: `white`, lineHeight: 0.5
            },
            {
                text: 'CONSENTIMIENTO DEL PACIENTE.' , fontSize: 14, alignment: 'justify',
            },
            {
                text: 'j', color: `white`, lineHeight: 0.5
            },
            {
                text: 'He leído y entendido este formato de consentimiento y comprendo que no debo firmarlo si todos los párrafos y todas mis dudas no han sido explicadas o contestadas a mi entera satisfacción o si no comprendo cualquier término o palabra contenida en este documento. ' , fontSize: 10, alignment: 'justify', lineHeight: 1.5 
            },
            {
                bold: true, text: 'Si tiene cualquier duda acerca de los riesgos y peligros, o cualquier pregunta acerca de la cirugía o tratamiento propuesto, pregunte a su médico o cirujano ahora, <<¡Antes de firmar esta forma de consentmiento!>> ¡No firme a menos que lea y entienda por completo este documento!' , fontSize: 10, alignment: 'justify', lineHeight: 1.5 
            },
            {
                text: '_________________________________________________________      _________________________________________________________' , fontSize: 10, alignment: 'justify', lineHeight: 1 
            },
            {
                text: 'Testigo                                                                                              Paciente / Responsable' , fontSize: 10, alignment: 'justify', lineHeight: 1 
            },
            {
                text: 'j', color: `white`, lineHeight: 0.5
            },
            {
                text: [
                    {text: 'DECLARACIÓN MÉDICA: ', bold: true, fontSize: 10},
                    {text: 'He explicado el contendido de este documento al paciente y he respondido a todas sus preguntas al grado máximo de mi conocimiento, por lo que el paciente ha sido informado adecuadamente y ha aceptado el tratamiento propuesto.', fontSize: 10}
                ],
                alignment: 'justify'
            },
            {
                text: 'j', color: `white`, lineHeight: 0.5
            },
            {
                text: '___________________________________________________________ ' , fontSize: 10, alignment: 'justify', lineHeight: 1 
            },
            {
                text: 'Firma del Médico                                                                                              ' , fontSize: 10, alignment: 'justify', lineHeight: 1 
            },
        ]
    }

    const pdf = pdfMake.createPdf(docDefinition);
    pdf.download("FormatoResponsiva.pdf");
}