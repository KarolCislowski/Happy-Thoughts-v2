import React from 'react'
import Moment from 'react-moment'
import {
  Col
} from 'react-bootstrap'
import Likes from './Likes/Likes'

const Post = ({ message, likes, id, postedBy, createdAt }) => {
  return (
    <Col className="post" xs={12}>
      <h4><strong>{postedBy}:</strong> <Moment fromNow className="time">{createdAt}</Moment></h4>
      <h5>{message}</h5>
      <section className="card-bottom">
        <Likes likes={likes} id={id} />
      </section>
    </Col>
  )
}

export default Post