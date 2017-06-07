import React from 'react'
import { Link } from 'react-router'

const SelectedHome = (props) => {
  console.log('props', props)
  const home = props.selected
  const host = props.selected.Host
  console.log('host', host);
  return (
    <div className = "container">
      <h1>Filler to space out navbar</h1>
      <h1>{home.name}</h1>
      <h3>Host: <Link to={`/users/${home.host_id}`}>{host.name}</Link></h3>
      <img src={home.imageUrl}/>
      <h4>Price/Night: ${home.price}</h4>
      <p>{home.description}</p>
      <button className = 'btn btn-primary' onClick = {() => {}} >Add to Cart</button>

    </div>
  )
}

export default SelectedHome;
