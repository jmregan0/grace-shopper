import React from 'react'
import { Link } from 'react-router'

const SelectedUser= (props) => {
  console.log('props', props)
  const user = props.selected

  return (
    <div className = "container">

      <h1>Name:{user.name}</h1>
      <h1>Email:{user.email}</h1>
      <h1>More sample text</h1>     
    </div>
  )
}

export default SelectedUser;
