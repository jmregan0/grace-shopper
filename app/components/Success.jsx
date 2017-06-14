import React from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import { updateAvailability } from '../action-creators/availability'

const Success = (props) => {
  const cart = props.cart
  const userId = (props.user && props.user.id) || null
  cart.map(reservation => props.reserveDate(reservation.id))
  return (
    <div className = "container">
    <h1>Thank you for your reservation!</h1>
    <h4>Thanks for booking a stay with GalacticBnB. We hope you enjoy your visit! To see a record of your transaction, go to your profile below:</h4>
    <Link to = {`/users/${userId}`}><button className = 'btn'>View Profile</button></Link>
    </div>
  )
}


export default Success
