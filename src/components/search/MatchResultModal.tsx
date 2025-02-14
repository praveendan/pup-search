import { Modal, Button, ModalProps, Card } from "react-bootstrap";
import { Dog } from "../../types/search";
import { Hearts } from "react-bootstrap-icons";
import styles from './resultCard.module.scss';

interface MatchResultModalProp extends ModalProps {
  match: Dog;
  onHide: () => void;
}

const MatchResultModal: React.FC<MatchResultModalProp> = ({ match, onHide, ...props }) => {
  return (
    <Modal
      {...props}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <Hearts />Its a Match.!!!!<Hearts />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Img variant="top" className={styles.resultCardImg} src={match.img} />
          <Card.Body>
            <Card.Title className="fw-bold text-primary">{match.name}</Card.Title>
            <Card.Text className="fw-bold mb-1">{match.breed}</Card.Text>
            <Card.Text className="text-muted mb-1">Age: <span className="fw-bold">{match.age}</span></Card.Text>
            <Card.Text className="text-muted"><small>Zip: {match.zip_code}</small></Card.Text>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MatchResultModal