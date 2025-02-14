import { Spinner } from 'react-bootstrap';
import Modal, { ModalProps } from 'react-bootstrap/Modal';
import styles from './loader.module.scss'

const Loader: React.FC<ModalProps> = ({ show, ...props }) => {
  return (
    <Modal
      show={show}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      contentClassName={`${styles.content} d-flex justify-content-center align-items-center`}
    >
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Modal>
  );
}

export default Loader

