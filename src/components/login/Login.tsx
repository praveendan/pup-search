import { Row, Col, Button, Form, Image } from "react-bootstrap";
import { ChangeEvent, MouseEvent, useState } from "react";

import styles from './login.module.scss';

import { User } from "../../types/user";
import { login } from "../../api/authService";

const Login: React.FC = () => {
  const [formVal, setFormVals] = useState<User>({
    name: '',
    email: ''
  })
  const [isFormFieldsValid, serIsFormFieldsValid] = useState({
    name: true,
    email: true
  })

  const setFormData = (e: ChangeEvent<HTMLInputElement>) => {
    setFormVals({
      ...formVal,
      [e.target.name]: e.target.value
    })
  }


  const validateForm = () => {
    let isValid = true
    const tempIsFormFieldsValid = {
      name: true,
      email: true
    }

    if (formVal.name.trim() === '') {
      isValid = false
      tempIsFormFieldsValid.name = false
    }
    if (!formVal.email.toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      tempIsFormFieldsValid.email = false
      isValid = false
    }

    return isValid
  }

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (validateForm()) {
      login(formVal.name, formVal.email)
    } else {
      console.log('no bueno')
    }
  }


  return (
    <Row className='min-vh-100 flex-column flex-sm-row'>
      <Col sm lg="6" className={`p-4 align-middle bg-primary d-flex align-items-center justify-content-center sm ${styles.logoContainer}`}>
        <Image src="img/footer-logo.svg" className={`w-50 mh-100 ${styles.logo}`} />
      </Col>
      <Col sm lg="6" className='bg-secondary d-flex align-items-center flex-grow-1'>
        <Form className={`mx-auto fw-bold ${styles.loginForm}`} >
          <Form.Group className="mb-3" controlId="loginName">
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="Enter name" name="name" value={formVal.name} onChange={setFormData}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="loginEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" value={formVal.email} onChange={setFormData} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="keepMeLoggedInCheckbox">
            <Form.Check type="checkbox" label="Keep me logged in" />
          </Form.Group>
          <Button variant="primary" type="submit" className='fw-bold' onClick={handleSubmit}>
            Login
          </Button>
        </Form>
      </Col>
    </Row>
  )
}

export default Login;
