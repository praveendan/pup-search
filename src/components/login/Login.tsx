import { Row, Col, Button, Form, Image } from "react-bootstrap"
import styles from './login.module.scss';

const Login: React.FC = () => {
  return (
    <Row className='min-vh-100 flex-column flex-sm-row'>
      <Col sm lg="6" className={`p-4 align-middle bg-primary d-flex align-items-center justify-content-center sm ${styles.logoContainer}`}>
        <Image src="img/footer-logo.svg" className={`w-50 mh-100 ${styles.logo}`} />
      </Col>
      <Col sm lg="6" className='bg-secondary d-flex align-items-center flex-grow-1'>
        <Form className={`mx-auto fw-bold ${styles.loginForm}`}>
          <Form.Group className="mb-3" controlId="loginEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="keepMeLoggedInCheckbox">
            <Form.Check type="checkbox" label="Keep me logged in" />
          </Form.Group>
          <Button variant="primary" type="submit" className='fw-bold'>
            Login
          </Button>
        </Form>
      </Col>
    </Row>
  )
}

export default Login;
