import React from 'react'

export const Login = ({ login }) => (
  <form className='form-inline navbar-form' onSubmit={evt => {
    evt.preventDefault()
    login(evt.target.username.value, evt.target.password.value)
  } }>
    <div class='input-group'>
      <input className='form-control' placeholder='email address' name="username" />
      <input className='form-control' placeholder='password' name="password" type="password" />
      <input className='btn btn-success' type="submit" value="Login" />
    </div>
  </form>
)

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {login},
)(Login)
