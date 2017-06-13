import React from 'react'
import { Link, browserHistory } from 'react-router'

export const Login = ({ login }) => (
  <form className='form-inline navbar-form' onSubmit={evt => {
    evt.preventDefault()
    login(evt.target.username.value, evt.target.password.value)
    browserHistory.push(`/homes`)
  } }>
    <div className='form-inline navbar-form'>
      <input className='form-control login-form' placeholder='email address' name="username" />
      <input className='form-control login-form' placeholder='password' name="password" type="password" />
      <input className='btn btn-success' type="submit" value="Login" />
      <Link to='/signup'><button className='btn'>Sign Up</button></Link>
    </div>
  </form>
)

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {login},
)(Login)
