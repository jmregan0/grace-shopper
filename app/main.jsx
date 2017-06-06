'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Landing from './components/Landing'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import HomesContainer from './containers/HomesContainer'
import SelectedHomeContainer from './containers/SelectedHomeContainer'
import { fetchHomes } from './action-creators/homes'

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
      <nav className='navbar navbar-inverse navbar-fixed-top' role='navigation'>
          <div className='container'>
              <div className='navbar-header'>
                  <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1'>
                      <span className='sr-only'>Toggle navigation</span>
                      <span className='icon-bar'></span>
                      <span className='icon-bar'></span>
                      <span className='icon-bar'></span>
                  </button>
                  <a className='navbar-brand' href='#'>Galactic BnB</a>
              </div>
              <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
                  <ul className='nav navbar-nav'>
                      <li>
                          <a href='#'>About</a>
                      </li>
                      <li>
                          <a href='#'>Homes</a>
                      </li>
                      <li>
                          <a href='#'>Contact</a>
                      </li>
                  </ul>
              {user ? <WhoAmI/> : <Login/>}
              </div>
          </div>
      </nav>
      {children}
    </div>
)

const HomesList = () => {
  axios.get('/homes')
  .then(res => res.data)
  .then(homes => store.dispatch(fetchHomes(homes)))
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <IndexRedirect to="/landing" />
        <Route path="/landing" component={Landing} />
        <Route path="/homes" component={HomesContainer} onEnter={HomesList}/>
        <Route path="/homes/:homeId" component={SelectedHomeContainer} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
