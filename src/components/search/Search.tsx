import React, { useCallback, useState } from "react";
import { Container, Row, Col, Button, Dropdown, DropdownButton, ButtonGroup, Pagination } from "react-bootstrap";
import { Hearts } from 'react-bootstrap-icons';
import Header from "../shared/Header";
import SearchForm from "./SearchForm";
import ResultCard from "./ResultCard";
import { DogSearch } from "../../types/search";
import { MAX_SEARCH_RES_PER_PAGE } from "../../constants";
import { getOtherPageResults } from "../../api/searchService";

const Search: React.FC = () => {
  const [dogs, setDogs] = useState<DogSearch>({
    results: [],
    total: 0
  })
  const [isPageBusy, setIsPageBusy] = useState(false)

  const pageForward = async () => {
    if (dogs.next) {
      setIsPageBusy(true)
      const res = await getOtherPageResults(dogs.next)
      setDogs(res.data)
      setIsPageBusy(false)
    }
  }

  const pageBackward = async() => {
    if (dogs.back) {
      setIsPageBusy(true)
      const res = await getOtherPageResults(dogs.back)
      setDogs(res.data)
      setIsPageBusy(false)
    }
  }

  const updateDogsSearch = useCallback((data: DogSearch) => {
    setDogs(data)
  }, [])

  return (
    <>
      <Header />
      <Container className="mt-5" fluid="xxl">
        <Row>
          <Col lg="3" className="border-right">
            <SearchForm updateDogsSearch={updateDogsSearch} />
          </Col>
          <Col lg="9" className="pb-5">
            <div className="w-100 px-2 pb-5 d-flex justify-content-end">
              <DropdownButton
                as={ButtonGroup}
                size="sm"
                variant="primary"
                title="Sort by"
              >
                <Dropdown.Item eventKey="1">Breed Ascending</Dropdown.Item>
                <Dropdown.Item eventKey="2">Breed Descending</Dropdown.Item>
              </DropdownButton>
            </div>
            <Row>
              {
                dogs.results.map(dog => (
                  <Col md="6" lg="4" xl="3" className="py-2">
                    <ResultCard key={dog.id} dog={dog} />
                  </Col>
                ))
              }
            </Row>
            {
              MAX_SEARCH_RES_PER_PAGE < dogs.total && (
                <Row>
                  <Col className="d-flex justify-content-end">
                    <Pagination>
                      <Pagination.Prev onClick={pageBackward} disabled={!dogs.back || isPageBusy} />
                      <Pagination.Next onClick={pageForward} disabled={!dogs.next || isPageBusy} />
                    </Pagination>
                  </Col>
                </Row>
              )
            }
            <div className="fixed-bottom d-flex justify-content-center p-2">
              <Button variant="primary" type="submit">
                Submit <Hearts/>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Search
