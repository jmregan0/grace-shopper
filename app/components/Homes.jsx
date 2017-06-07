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
              <div className="col-sm-12">
                <img className="col-sm-3" src={home.imageUrl}/>
              </div>
              <div className="col-sm-9">
                <h3><Link to={`/homes/${home.id}`}>{home.name}</Link></h3>
                <h4>Price/Night: ${home.price}</h4>
                <p>{home.excerpt}</p>
                <button className = 'btn btn-primary' onClick = {() => {}} >Add to Cart</button>
                <Link className = 'btn btn-default' to={`/homes/${home.id}`}>More Information</Link>
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
