import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  Form,
  Button,
  Row,
  Col,
  Nav
} from 'react-bootstrap'
import { auth } from 'reducers/auth'

export const Login = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const history = useHistory()

  const url = 'http://localhost:8080/sessions'

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(url, {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => {
      if (!res.ok) {
        throw new Error('Your e-mail and/or password was incorrect')
      }
      return res.json()
    }).then(({ userId, accessToken }) => {
      if (accessToken) {
        window.localStorage.setItem('accessToken', accessToken)
        window.localStorage.setItem('userId', userId)
        dispatch(auth.actions.login())
        history.push('/')
      }
    }).catch((err) => {
      setError(err.message)
    })
  }

  return (
    <Row className="justify-content-md-center">
      <Form as={Col} md={6}>
        <h2>Log in</h2>
        <Nav.Link href="/signup"> Or, create your account now 💖</Nav.Link>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address:</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        {error && <p className="error">*{error}</p>}
        <Button type="submit" onClick={handleSubmit}>Login</Button>
      </Form>
    </Row>
  )
}