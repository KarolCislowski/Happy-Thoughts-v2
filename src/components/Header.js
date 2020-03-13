/* eslint-disable operator-linebreak */
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { auth } from 'reducers/auth'
import { BtnLogOut } from 'components/UI'

import {
  Navbar,
  Nav
} from 'react-bootstrap'

export const Header = () => {
  const dispatch = useDispatch()

  // Check if there is not token in localstorage from preview session
  if (window.localStorage.accessToken) {
    dispatch(auth.actions.login())
  }

  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  )

  return (
    <Navbar sticky="top" collapseOnSelect expand="lg">
      <Link to="/">
        <Navbar.Brand>
          Happy Thoughts
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav>
          {isAuthenticated && <>
            <Nav.Link href="/myMessages">
              My Messages
            </Nav.Link>
            <BtnLogOut />
          </>}
          {!isAuthenticated &&
            <>
              <Nav.Link href="/login">
                LOGIN
              </Nav.Link>
              <Nav.Link href="/signup">
                SIGNUP
              </Nav.Link>
            </>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}