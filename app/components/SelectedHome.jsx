import React from 'react'
import { Link } from 'react-router'

const SelectedHome = (props) => {
  console.log('props', props)
  const home = props.selected
  const host = props.selected.Host
  const dates = props.availability.list
  console.log('host', host);
  console.log('dates', dates);
  return (
    <div className = "container">
      <h1>{home.name}</h1>
      <h4>Host: <Link to={`/users/${home.host_id}`}>{host.name}</Link></h4>
      <div className = "row">
        <img src={home.imageUrl} className="col-md-6 col-sm-12"/>
        <div className = "col-md-6 col-sm-12">
          <h4>Price/Night: ${home.price}</h4>
          <h4>Location: {home.location}</h4>
          <p>{home.description}</p>
        </div>
      </div>
      <hr/>
      <div className = "row">
        <h2>Booking Details:</h2>
      </div>
      <div className = "row">
        <div className = "col-md-6 col-sm-12">
          <h1>Insert calendar here</h1>
        </div>
        {
          dates.length
          ? (
              <div className = "col-md-6 col-sm-12">
                <h4>Select your dates:</h4>
                <h4>Start Date:</h4>
                <select className="form-control padding-bottom" id = "startDate">
                {dates.map(date =>
                  <option key={`${date.id}`} value={`${date.date}`}>{date.date}</option>
                )}
                </select>
                <h4>End Date:</h4>
                <select className="form-control padding-bottom" id = "endDate">
                {dates.map(date =>
                  <option key={`${date.id}`} value={`${date.date}`}>{date.date}</option>
                )}
                </select>
                <button className = 'btn btn-primary' onClick = {() => {}} >Add to Cart</button>
              </div>
            )
          : (
              <div>
                <h3>No dates currently available.</h3>
                <Link to = {`/homes/${home.id}/edit`} ><button className = 'btn btn-secondary'>Edit this Listing</button></Link>
              </div>
            )
        }


      </div>

    </div>
  )
}

export default SelectedHome;
