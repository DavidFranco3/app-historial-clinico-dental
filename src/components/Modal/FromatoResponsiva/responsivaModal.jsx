import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalHeader from "react-bootstrap";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

function formatoResponsivaModal(params) {
    const {show, setShow, title, children, size} = params;

    return (
        <Modal
            className="basic-modal"
            show={show}
            onHide={() => setShow(false)}
            size={size !== undefined ? size : "xl"}
            backdrop="static"
            keyboard={false}
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

export default formatoResponsivaModal;