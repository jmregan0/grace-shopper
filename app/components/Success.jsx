import React from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import { updateAvailability } from '../action-creators/availability'

let dummyData = [
  [{
    date: 'July 5, 2017',
    guest_cart_items: {
      cart_id: 1,
      availability_id: 4
    },
    home: {
      description: 'Yodas hut was...',
      excerpt: 'Yodas hut...',
      host_id: 3,
      id: 1,
      imageUrl: 'https://lumiere-a.akamaihd.net/v1/images/yodas-hut_a3d1133d.jpeg?region=0%2C75%2C1560%2C880&width=768',
      location: 'Dagobah',
      name: "Yoda's Hut",
      price: 150,
    },
    home_id: 1,
    id: 4
  }, {
    date: 'July 6, 2017',
    guest_cart_items: {
      cart_id: 1,
      availability_id: 6
    },
    home: {
      description: 'Yodas hut was...',
      excerpt: 'Yodas hut...',
      host_id: 3,
      id: 1,
      imageUrl: 'https://lumiere-a.akamaihd.net/v1/images/yodas-hut_a3d1133d.jpeg?region=0%2C75%2C1560%2C880&width=768',
      location: 'Dagobah',
      name: "Yoda's Hut",
      price: 150,
    },
    home_id: 1,
    id: 6
  }],
  []
]

const Success = (props) => {
  const cart = props.cart
  const userId = (props.user && props.user.id) || null
  console.log('props', props)
  console.log('cart in props', cart)
  return (
    <div className = "container">
    <h1>Thank you for your reservation!</h1>
    <h4>Thanks for booking a stay with GalacticBnB. We hope you enjoy your visit! To see a record of your transaction, go to your profile below:</h4>
    <Link to = {`/users/${userId}`}><button className = 'btn'>View Profile</button></Link>
    </div>
  )
}


export default Success
