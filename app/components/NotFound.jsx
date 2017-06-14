import React from 'react'
import { Link } from 'react-router'

const NotFound = props => {
  const {pathname} = props.location || {pathname: '<< no path >>'}
  const userId = (props.user && props.user.id) || null
  console.error('NotFound: %s not found (%o)', pathname, props)
  return (
    <div className="fourofour">
      <div className="container whitetext">
        <h1>Ever found yourself lost in space? Or like your request went in a black hole? Well, this is one of those times, unfortunately.</h1>
        <p><em>Did you spell your URL correctly? You entered <strong>{pathname}</strong></em></p>
        <p>You can try searching for a home or check out your profile:</p>
        <Link to = {`/homes`}><button className = 'btn'>View Homes</button></Link>
        <Link to = {`/users/${userId}`}><button className = 'btn'>View Profile</button></Link>
      </div>
    </div>
  )
}

export default NotFound
