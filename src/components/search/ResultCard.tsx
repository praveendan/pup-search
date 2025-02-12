import { Card } from "react-bootstrap";
import { Star } from 'react-bootstrap-icons';
import styles from './resultCard.module.scss';


type ResultCardProps = {
  id: number
}

const ResultCard: React.FC<ResultCardProps> = ({id}) => {
  return (
    <Card className="shadow-sm">
      <Card.Img variant="top" src="img/stockpup.jpg" />
      <Card.Body>
        <Card.Title className="fw-bold text-primary">Rex</Card.Title>
        <Card.Text className="fw-bold mb-1">Rottweiler</Card.Text>
        <Card.Text className="text-muted mb-1">Age: <span className="fw-bold">2</span></Card.Text>
        <Card.Text className="text-muted"><small>Zip: 78209</small></Card.Text>
      </Card.Body>
      <Card.Footer>
        <Star className={styles.favourite } />
      </Card.Footer>
    </Card>
  )
}

export default ResultCard
