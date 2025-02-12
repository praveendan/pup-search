import React from "react"
import { Container, Row, Col, Button, Card, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap"
import Header from "../shared/Header"
import SearchForm from "./SearchForm";

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
      <Container>
        <Row>
          <Col lg="3" className="border-right">
            <SearchForm />
          </Col>
          <Col lg="9" className="pb-5">
            <div className="w-100 p-2 d-flex justify-content-end">
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
            <div className="d-flex flex-row flex-wrap justify-content-between">
              {
                items.map(i => (
                  <Card style={{ width: '18rem' }} className="m-2">
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                      <Card.Title>Card Title {i}</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </Card>
                ))
              }
            </div>
            <div className="fixed-bottom d-flex justify-content-center p-2">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Search
