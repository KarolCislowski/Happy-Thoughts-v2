import React, { useState, useEffect } from 'react'
import {
  Row
} from 'react-bootstrap'
import Form from './Form/FormComponent'
import Post from './Post/Post'

const Posts = () => {
  const [postsList, setPostsList] = useState([])

  const [loading, setLoading] = useState(true)

  const token = window.localStorage.accessToken

  useEffect(() => {
    fetch('http://localhost:8080/messages', {
      headers: {
        Authorization: token
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setPostsList(data)
        setLoading(false)
      })
  }, [])

  return (
    <Row>
      <Form />
      {loading && <h3>Love is on the way <i className="fa fa-heart" aria-hidden="true" /></h3>}
      {Array.isArray(postsList) && postsList.map((post) => {
        return (
          <Post
            // eslint-disable-next-line no-underscore-dangle
            key={post._id}
            message={post.message}
            likes={post.likes}
            // eslint-disable-next-line no-underscore-dangle
            createdAt={post.createdAt}
            id={post._id}
            postedBy={post.postedBy.name} />
        )
      })}
    </Row>
  )
}

export default Posts