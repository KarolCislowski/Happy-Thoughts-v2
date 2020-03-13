import React, { useState } from 'react'
import {
  Row,
  Button
} from 'react-bootstrap'

const Likes = ({ likes, id }) => {
  const [localLikes, setLocalLikes] = useState(likes)

  const token = window.localStorage.accessToken

  const likeClickHandler = () => {
    fetch(`http://localhost:8080/messages/${id}/like`, {
      method: 'post',
      headers: {
        Authorization: token
      }
    })
    setLocalLikes(localLikes + 1)
  }

  return (
    <Row className="justify-content-end">
      <section className="justify-content-end">
        <Button variant="outline-primary" type="button" onClick={likeClickHandler} className="like">
          <h5>💖{localLikes}</h5>
        </Button>

      </section>
    </Row>
  )
}

export default Likes