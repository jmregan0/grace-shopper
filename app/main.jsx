'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory, Link} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import axios from 'axios';
import store from './store'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import EditHomeContainer from './containers/EditHomeContainer'
import NewHomeContainer from './containers/NewHomeContainer'
import HomesContainer from './containers/HomesContainer'
import LandingContainer from './containers/LandingContainer'
import SelectedHomeContainer from './containers/SelectedHomeContainer'
import CartContainer from './containers/CartContainer'
import SignUpContainer from './containers/SignUpContainer'
import { fetchHomes, fetchLatestHomes, getHomeById } from './action-creators/homes'
import { getAvailabilityById } from './action-creators/availability'
import ProfileContainer from './containers/ProfileContainer'
import { fetchUsers, getUserById, setCurrentUser } from './action-creators/users'
import { getCartByUserId } from './action-creators/cart'

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
      <nav className='navbar navbar-default navbar-static-top' role='navigation'>
          <div className='container'>
              <div className='navbar-header'>
                  <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1'>
                      <span className='sr-only'>Toggle navigation</span>
                      <span className='icon-bar'></span>
                      <span className='icon-bar'></span>
                      <span className='icon-bar'></span>
                  </button>
                  <Link to="/" className='navbar-brand'>Galactic BnB</Link>
              </div>
              <div className='collapse navbar-collapse left' id='bs-example-navbar-collapse-1'>
                  <ul className='nav navbar-nav'>
                      <li>
                          <Link to='#'>About</Link>
                      </li>
                      <li>
                          <Link to='/homes'>Homes</Link>
                      </li>
                      <li>
                          {user ? null : <Link to='/signup'>SignUp</Link>}
                      </li>
                      <li>
                          {user ? <Link to={`/users/${user.id}`}>Profile</Link> : null}
                      </li>
                      <li>
                        {user ? <Link to='/new-home'>Add Home</Link> : null}
                      </li>
                      <li>
                          {user ? <Link to={`/cart/${user.id}`}>Cart</Link> : null}
                      </li>
                  </ul>
              </div>
                <div className="collapse navbar-collapse right">
                  {user ? <WhoAmI/> : <Login/>}
                </div>
          </div>
      </nav>
      {children}
    </div>
)

const fetchLatestHomesList = () => {
  axios.get('/api/homes/latest')
  .then(res => res.data)
  .then(latestHomes =>{
    store.dispatch(fetchLatestHomes(latestHomes))
  })
}

const fetchHomesList = () => {
  axios.get('/api/homes')
  .then(res => res.data)
  .then(homes =>{
    store.dispatch(fetchHomes(homes))
  })
}

const fetchSelectedHome = (nextRouterState) => {
  const homeId = nextRouterState.params.homeId;
  store.dispatch(getHomeById(homeId));
  store.dispatch(getAvailabilityById(homeId))
}

const fetchUserInfo = (nextRouterState) => {
  const userId = nextRouterState.params.userId;
  store.dispatch(getUserById(userId));
}

const fetchCurrentUser = () => {
  axios.get('/api/auth/whoami')
    .then(res => res.data)
    .then(user => {
      store.dispatch(setCurrentUser(user))
    })
}


const fetchUserCart = (nextRouterState) => {
  const cartId = nextRouterState.params.cartId;
  console.log('router state', nextRouterState);
  store.dispatch(getCartByUserId(cartId));
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp} onEnter={fetchLatestHomesList}>
        <IndexRedirect to="/landing" />
        <Route path="/landing" component={LandingContainer} onEnter={fetchHomesList}/>
        <Route path="/homes" component={HomesContainer} onEnter={fetchHomesList}/>
        <Route path="/new-home" component={NewHomeContainer} onEnter={fetchCurrentUser}/>
        <Route path="/homes/:homeId" component={SelectedHomeContainer} onEnter={fetchSelectedHome}/>
        <Route path="/homes/:homeId/edit" component={EditHomeContainer} onEnter={fetchSelectedHome}/>
        <Route path="/users/:userId" component={ProfileContainer} onEnter={fetchUserInfo}/>
        <Route path="/profile/:userId" component={ProfileContainer} onEnter={fetchUserInfo}/>
        <Route path="/cart/:cartId" component={CartContainer} onEnter={fetchUserCart} />
        <Route path="/signup" component={SignUpContainer} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
