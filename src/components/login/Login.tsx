import { Row, Col, Button, Form, Image } from "react-bootstrap";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from './login.module.scss';

import { User } from "../../types/user";
import { EMAIL_REGEX } from "../../constants";
import { login } from "../../api/authService";
import { useAuth } from "../../context/AuthContext";

type FormValidity = {
  name: boolean;
  email: boolean;
}
const Login: React.FC = () => {
  const [formVal, setFormVals] = useState<User>({
    name: '',
    email: ''
  })
  const [isFormFieldsValid, setIsFormFieldsValid] = useState<FormValidity>({
    name: true,
    email: true
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { logInUser } = useAuth()
  const navigate = useNavigate();

  const setFormData = (e: ChangeEvent<HTMLInputElement>) => {
    setFormVals({
      ...formVal,
      [e.target.name]: e.target.value
    })
  }


  const validateAndGetIsInvalidForm = () => {
    const tempIsFormFieldsValid: FormValidity = {
      name: true,
      email: true
    }

    setIsFormFieldsValid(tempIsFormFieldsValid)

    if (formVal.name.trim() === '') {
      tempIsFormFieldsValid.name = false
    }
    if (!formVal.email.toLowerCase()
      .match(EMAIL_REGEX)) {
      tempIsFormFieldsValid.email = false
    }

    setIsFormFieldsValid(tempIsFormFieldsValid)

    return Object.values(tempIsFormFieldsValid).some(val => val === false)
  }

  const handleLogin = async () => {
    setIsLoading(true)
    const loginRes = await login(formVal.name, formVal.email)
    setIsLoading(false)
  
    if (loginRes.resData?.status === 400) {
      setIsFormFieldsValid({
        name: false,
        email: false
      })
      return
    }

    if (loginRes.resData?.status !== 200) {
      alert('Error logging in. please try again later.')
      return
    }
  
    logInUser()
    navigate("/")
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      return
    }

    if (validateAndGetIsInvalidForm()) {
      return
    }

    handleLogin()
  }

  return (
    <Row className='min-vh-100 flex-column flex-sm-row'>
      <Col sm lg="6" className={`p-4 align-middle bg-primary d-flex align-items-center justify-content-center sm ${styles.logoContainer}`}>
        <Image src="img/footer-logo.svg" className={`w-50 mh-100 ${styles.logo}`} />
      </Col>
      <Col sm lg="6" className='bg-secondary d-flex align-items-center flex-grow-1'>
        <Form className={`mx-auto fw-bold ${styles.loginForm}`} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="loginName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="Enter your name"
              isInvalid={!isFormFieldsValid.name}
              name="name"
              value={formVal.name}
              onChange={setFormData}
              required
              aria-label="Enter your name"
              />
          </Form.Group>
          <Form.Group className="mb-3" controlId="loginEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              isInvalid={!isFormFieldsValid.email}
              placeholder="Enter your email address"
              name="email"
              value={formVal.email}
              onChange={setFormData}
              required
              aria-label="Enter your email address"
              />
          </Form.Group>
          <Button variant="primary" type="submit" className='fw-bold' disabled={isLoading}>
            Login
          </Button>
        </Form>
      </Col>
    </Row>
  )
}

export default Login;
