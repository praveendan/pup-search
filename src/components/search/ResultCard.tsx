import { Card } from "react-bootstrap";
import { Star } from 'react-bootstrap-icons';
import styles from './resultCard.module.scss';
import { Dog } from "../../types/search";

type ResultCardProps = {
  dog: Dog;
}

const ResultCard: React.FC<ResultCardProps> = ({ dog }) => {
  return (
    <Card className="shadow-sm">
      <Card.Img variant="top" className={styles.resultCardImg} src={dog.img} />
      <Card.Body>
        <Card.Title className="fw-bold text-primary">{dog.name}</Card.Title>
        <Card.Text className="fw-bold mb-1">{dog.breed}</Card.Text>
        <Card.Text className="text-muted mb-1">Age: <span className="fw-bold">{dog.age}</span></Card.Text>
        <Card.Text className="text-muted"><small>Zip: {dog.zip_code}</small></Card.Text>
      </Card.Body>
      <Card.Footer>
        <Star className={styles.favourite } />
      </Card.Footer>
    </Card>
  )
}

export default ResultCard
