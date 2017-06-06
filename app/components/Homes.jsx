import React from 'react'
import { Link } from 'react-router'

const Homes = (props) => {
  const list = props.homes
  return (
    <div>
      <h1>Select a home</h1>
      <ul>
      {list.map(home => {
        return (
          <div className="list-group-item" key={ home.id }>
            <Link to={`/homes/${home.id}`}>{home.name}</Link>
          </div>
        )
      })}
      </ul>
    </div>
  )
}

export default Homes
