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
  const user = props.user
  console.log('props', props)
  console.log('cart in props', cart)
  return (
    <div>
    <h1>Thank you for your reservation!</h1>
    {dummyData.map(homeReservation => {
      return (
        homeReservation.map(date => {
          console.log('date in Success', date)
          return (
            axios.put(`/api/availability/${date.id}`)
            .then(res => {
            //   console.log('res in Success', res)
            })
          )
        })
        // axios.post('/api/transactions'), {
        //   price: homeReservation[0].home.price,
        //   startDate: homeReservation[0].date,
        //   endDate: homeReservation[homeReservation.length-1].date,
        //   host_id: ,
        //   guest_id: user.id,
        //   home_id: homeReservation.home.id
        //   }
        // .then(res => res.data)
        // .then
      )
    })}
    </div>
  )
}


export default Success
