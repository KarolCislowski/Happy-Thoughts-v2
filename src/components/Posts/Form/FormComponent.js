/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react'
import {
  Col,
  Row,
  Form,
  Button
} from 'react-bootstrap'

const FormComponent = () => {
  const [message, setMessage] = useState('')
  const token = window.localStorage.accessToken

  const submitHandler = () => {
    fetch('https://cislowski-happy.herokuapp.com/messages', {
      method: 'post',
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    })
  }

  return (
    <Col xs={12}>
      <Row>
        <Col xs={1}><h1>💖</h1></Col>
        <Col sm={11}>
          <Form onSubmit={submitHandler}>
            <Form.Control autofocus="true" minLength="5" maxLength="140" as="textarea" rows="3" required onChange={(e) => { setMessage(e.target.value) }} className="textarea" />
            <Row className="justify-content-end">
              <p className={((message.length < 5 || message.length >= 140) ? 'wrongLength' : 'goodLength')}><strong>{message.length}/140</strong></p>
              <Button variant="primary" type="submit" disabled={message.length < 5} className="submit-form">
                Send
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Col>
  )
}

export default FormComponent
