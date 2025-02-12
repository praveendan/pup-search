import React from "react";
import { Container, Row, Col, Button, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import { Hearts } from 'react-bootstrap-icons';
import Header from "../shared/Header";
import SearchForm from "./SearchForm";
import ResultCard from "./ResultCard";

const items: number[] = [];
(function () {
  // Function body
  for (let i = 0; i < 30; i++) {
    items.push(i)
  }
})();
const Search: React.FC = () => {
  return (
    <>
      <Header />
      <Container className="mt-5" fluid="xxl">
        <Row>
          <Col lg="3" className="border-right">
            <SearchForm />
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
                items.map(i => (
                  <Col md="6" lg="4" xl="3" className="py-2">
                    <ResultCard id={i} />
                  </Col>
                ))
              }
            </Row>
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
