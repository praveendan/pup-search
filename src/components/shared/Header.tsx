import { Navbar, Container, Nav, Image } from "react-bootstrap"

const Header: React.FC = () => {
  return (
    <header className="row fw-bold sticky-top">
      <Navbar expand="lg" bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            <Image src="img/nav-logo.svg" rounded />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>

  )
}

export default Header