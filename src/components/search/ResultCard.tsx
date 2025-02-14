import { Card } from "react-bootstrap";
import { Star, StarFill } from 'react-bootstrap-icons';
import styles from './resultCard.module.scss';
import { Dog } from "../../types/search";

type ResultCardProps = {
  dog: Dog;
  favourites: Set<string>;
  addRemoveFavourite: (dogId: string) => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ dog, favourites, addRemoveFavourite }) => {
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
        {
          favourites.has(dog.id) ? <StarFill className={styles.favourite} onClick={_ => addRemoveFavourite(dog.id)} role="button"/> : <Star className={styles.favourite} onClick={_ => addRemoveFavourite(dog.id)} role="button"/>
        }
      </Card.Footer>
    </Card>
  )
}

export default ResultCard
