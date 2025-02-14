import React, { useCallback, useState } from "react";
import { Container, Row, Col, Dropdown, DropdownButton, ButtonGroup, Pagination } from "react-bootstrap";
import Header from "../shared/Header";
import SearchForm from "./SearchForm";
import ResultCard from "./ResultCard";
import { DogSearch } from "../../types/search";
import { MAX_SEARCH_RES_PER_PAGE } from "../../constants";
import { getOtherPageResults } from "../../api/searchService";
import FindAMatchPane from "./FindAMatchPane";
import Loader from "../shared/Loader";

const Search: React.FC = () => {
  const [dogs, setDogs] = useState<DogSearch>({
    results: [],
    total: 0
  })
  const [favourites, setFavourites] = useState<Set<string>>(new Set())
  const [isPageBusy, setIsPageBusy] = useState(true)
  const [sortResultByBreedAsc, setSortResultByBreedAsc] = useState('true')

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

  const addRemoveFavourite = (dogId: string) => {
    const tempSet = new Set(favourites)
    if (tempSet.has(dogId)) {
      tempSet.delete(dogId)
    } else {
      tempSet.add(dogId)
    }
    setFavourites(tempSet)
  }

  const handleSelect = (eventKey: any) => {
    setSortResultByBreedAsc(eventKey)
  };

  const updateDogsSearch = useCallback((data: DogSearch) => {
    setDogs(data)
  }, [])

  const setIsLoading = useCallback((isLoading: boolean) => setIsPageBusy(isLoading), [])

  return (
    <>
      <Header />
      <Container className="mt-5" fluid="xxl">
        <Row>
          <Col lg="3" className="border-right">
            <SearchForm
              updateDogsSearch={updateDogsSearch}
              sortResultByBreedAsc={sortResultByBreedAsc === 'true'}
              isLoading={isPageBusy}
              setIsLoading={setIsLoading}
            />
          </Col>
          <Col lg="9" className="pb-5">
            <div className="w-100 px-2 pb-5 d-flex justify-content-end">
              <DropdownButton
                as={ButtonGroup}
                size="sm"
                variant="primary"
                title={`Sort by Breed ${sortResultByBreedAsc === 'true' ? 'Ascending' : 'Descending'} (click on search to sort)`}
                onSelect={handleSelect}
              >
                <Dropdown.Item eventKey="true">Breed Ascending</Dropdown.Item>
                <Dropdown.Item eventKey="false">Breed Descending</Dropdown.Item>
              </DropdownButton>
            </div>
            <Row>
              {
                dogs.results.map(dog => (
                  <Col md="6" lg="4" xl="3" className="py-2" key={dog.id}>
                    <ResultCard key={dog.id} dog={dog} favourites={favourites} addRemoveFavourite={addRemoveFavourite} />
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
            <FindAMatchPane favourites={favourites}/>
          </Col>
        </Row>
        <Loader show={isPageBusy} />
      </Container>
    </>
  )
}

export default Search
