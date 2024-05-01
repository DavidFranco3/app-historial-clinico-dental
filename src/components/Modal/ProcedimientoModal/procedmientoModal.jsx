import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import ModalHeader from "react-bootstrap/ModalHeader";
import "../BasicModal/BasicModal.css"

function procedimientoModal(params) {
    const {show, setShow, title, children, size} = params;

    return (
        <Modal
            className="basic-modal"
            show = {show}
            onHide={() => setShow(false)}
            size= {size != undefined ? size : "xl"}
            backdrop = "static"
            keyboard = {false}
        >
            <ModalHeader>
                <h2>{title}</h2>
                <Modal.Title>
                    <FontAwesomeIcon
                    title="Cerrar ventana"
                    icon = {faTimesCircle}
                    onClick={() => setShow(false)}
                />
                </Modal.Title>
            </ModalHeader>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    );
}

export default procedimientoModal;