import { useState } from "react";
import { Button } from "react-bootstrap";
import { Hearts } from "react-bootstrap-icons";
import MatchResultModal from "./MatchResultModal";
import { findMatch } from "../../api/searchService";
import { Dog } from "../../types/search";
import useErrorHandler from "../../hooks/useErrorHandler";

type FindAMatchPaneProps = {
  favourites: Set<string>;
}

const FindAMatchPane: React.FC<FindAMatchPaneProps> = ({ favourites }) => {
  const [modalShow, setModalShow] = useState(false);
  const [match, setMatch] = useState<Dog>({
    age: 0,
    breed: '',
    id: '',
    img: '',
    name: '',
    zip_code: ''
  })
  const { handle } = useErrorHandler()

  const loadMatch = async () => {
    const res = await findMatch(Array.from(favourites))
    handle(res)
    setMatch(res.data.results[0])
    setModalShow(true)
  }

  return (
    <>
      <div className="fixed-bottom d-flex justify-content-center p-2 bg-opacity-75 bg-white">
        {
          0 < favourites.size && (
            <Button variant="primary" onClick={loadMatch}>
              FIND A MATCH.! <Hearts />
            </Button>
          )
        }
      </div>
      <MatchResultModal
        match={match}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  )
}

export default FindAMatchPane