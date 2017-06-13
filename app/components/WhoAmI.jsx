import React from 'react'
import {browserHistory} from 'react-router'

export const WhoAmI = ({ user, logout }) => (
  <div className="whoami">
    <span className="whoami-user-name welcome-user">Welcome, {user && user.name}</span>
    <button className="btn btn-success logout"
      onClick={() => {
        logout()
        browserHistory.push(`/landing`)
      }}>Logout</button>
  </div>
)

import {logout} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth }),
  {logout},
)(WhoAmI)
