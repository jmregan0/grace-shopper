'use strict'

const db = require('APP/db')
const Cart = db.model('cart')
const guest_cart_items = db.model('guest_cart_items')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  // .get('/:id', (req, res, next) => {
  //   console.log('hit the route')
  //   return Cart.findOne({
  //     where: {user_id: req.params.id}
  //   })
  //   .then(guestCart => {
  //     if(guestCart === null){
  //       return Cart.create({user_id: req.params.id})
  //     } else {
  //       return guest_cart_items.findAll({
  //         where: {cart_id: guestCart.id}
  //     })

  //     }
  //   .then(data => {
  //     console.log('found user cart', data)
  //       res.json(data)
  //     })
  //   })
  //   .catch(next)
  // })
  .post('/:id', (req, res, next) => {
  
    var availabilities = req.body;


    Cart.findOne({
      where: {id: req.params.id}
    })
    .then(cart => {
    //   return Promise.spread({})
    console.log("CART", cart)
    console.log("AVAIL",availabilities)
    return cart.addAvailabilities(availabilities)

    // availabilities.map(avail=>{
    //   return cart.addAvailability(avail)
    // })

    // Promise.all(availabilities)

    })
    .then(()=>{res.sendStatus(201)})
    .catch(console.log.bind(console))
  })


