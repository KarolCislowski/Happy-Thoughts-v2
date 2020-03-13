import React from 'react'
// Router imports
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
// Redux imports
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { auth } from 'reducers/auth'

// Pages
import Posts from 'components/Posts/Posts'
import { Signup } from 'components/Signup'
import { Login } from 'components/Login'
import { Header } from 'components/Header'
import { PrivateRoute } from 'util/PrivateRoute'
import { Profile } from 'components/Profile'

import { Container } from 'react-bootstrap'

// Redux config
const reducer = combineReducers({
  auth: auth.reducer
})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Container>
          <Header />
          <Container>
            <Switch>
              <PrivateRoute path="/" exact>
                <Posts />
              </PrivateRoute>
              <PrivateRoute path="/myMessages" exact>
                <Profile />
              </PrivateRoute>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="*">
                <h1>Error</h1>
              </Route>
            </Switch>
          </Container>
        </Container>
      </Router>
    </Provider>
  )
}

