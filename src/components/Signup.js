import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from 'reducers/auth'
import { useHistory } from 'react-router-dom'
import {
  Form,
  Button,
  Row,
  Col,
  Nav
} from 'react-bootstrap'

export const Signup = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState(false)
  const history = useHistory()

  const url = 'https://cislowski-happy.herokuapp.com/users'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === passwordConfirm) {
      fetch(url, {
        method: 'post',
        body: JSON.stringify({ name, email, password }),
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
        }
      }).then(() => history.push('/'))
    } else {
      setError(true)
    }
  }

  const handleChange = (e, callback) => {
    callback(e.target.value)
    setError(false)
  }

  return (
    <Row className="justify-content-md-center">
      <Form as={Col} md={6}>
        <h2>Sign up</h2>
        <Nav.Link href="/login"> Or log in here 💖</Nav.Link>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => handleChange(e, setName)} />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address:</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => handleChange(e, setEmail)} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => handleChange(e, setPassword)} />
        </Form.Group>
        <Form.Group controlId="formBasicPasswordConfirm">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control type="password" placeholder="Password" value={passwordConfirm} onChange={(e) => handleChange(e, setPasswordConfirm)} />
        </Form.Group>
        {error && <p className="error">* Both passwords must be identical</p>}
        <Button type="submit" onClick={handleSubmit}>Submit</Button>
      </Form>
    </Row>
  )
}
