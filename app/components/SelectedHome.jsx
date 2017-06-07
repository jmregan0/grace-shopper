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
      <h3>Host: <Link to={`/users/${home.host_id}`}>{host.name}</Link></h3>
      <img src={home.imageUrl} className="col-sm-4"/>
      <h4>Price/Night: ${home.price}</h4>
      <p>{home.description}</p>
      <h4>Select your date:</h4>
      <select className="form-control padding-bottom">
      {dates.map(date =>
        <option key={`${date.id}`} value={`${date.date}`}>{date.date}</option>
      )}
      </select>
      <button className = 'btn btn-primary' onClick = {() => {}} >Add to Cart</button>

    </div>
  )
}

export default SelectedHome;
