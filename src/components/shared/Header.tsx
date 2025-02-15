import { Navbar, Container, Nav, Image } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/authService"
import { useAuth } from "../../context/AuthContext"

const Header: React.FC = () => {
  const { logOutUser } = useAuth()
  const navigate = useNavigate();

  const logoutUser = async () => {
    await logout()
    logOutUser()
    navigate("/login")
  }
  return (
    <header className="row fw-bold sticky-top">
      <Navbar expand="lg" bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/pup-search">
            <Image src="img/nav-logo.svg" rounded />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" onClick={logoutUser}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>

  )
}

export default Header