import React, { useState } from 'react'

import {
  Row,
  Col,
  ButtonGroup,
  Button,
  Form
} from 'react-bootstrap'

export const EditableMessage = ({ message, id }) => {
  const token = window.localStorage.accessToken
  const [editMode, setEditMode] = useState(false)
  const [newMessage, setNewMessage] = useState(message)
  const url = 'https://cislowski-happy.herokuapp.com/'

  const handleDelete = () => {
    fetch(`${url}messages/${id}`, {
      method: 'delete',
      headers: {
        Authorization: token
      }
    }).then(() => {
      window.location.reload()
    })
  }

  const handleUpdate = () => {
    fetch(`${url}messages/${id}`, {
      method: 'put',
      body: JSON.stringify({ message: newMessage }),
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    }).then(() => {
      window.location.reload()
    })
  }

  return (
    <Col className="post" xs={12}>
      <Row>
        <Col md={10}>
          {!editMode && <h5>{message}</h5>}
          {editMode && <Form.Control autofocus="true" minLength="5" maxLength="140" as="textarea" rows="3" required value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />}
        </Col>
        <Col md={2} className="justify-content-end">
          <ButtonGroup>
            {!editMode && <Button variant="warning" type="button" onClick={() => setEditMode(true)}>edit</Button>}
            {editMode && <Button variant="success" type="button" onClick={handleUpdate} className="update">update</Button>}
            <Button variant="danger" type="button" onClick={handleDelete} className="delete">delete</Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Col>



  )
}
