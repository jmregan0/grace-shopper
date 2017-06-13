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
          <div className="row list-group-item" key={ home.id }>
            <div className="row">
              <div className="col-md-3">
                <img className="col-xs-12" src={home.imageUrl}/>
              </div>
              <div className="col-md-9">
                <h3><Link to={`/homes/${home.id}`}>{home.name}</Link></h3>
                <h4>Price/Night: ${home.price}</h4>
                <p>{home.excerpt}</p>
                <Link className = 'btn btn-primary' to={`/homes/${home.id}`}>More Information</Link>
              </div>
            </div>
          </div>
        )
      })}
      </ul>
    </div>
  )
}

export default Homes
