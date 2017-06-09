'use strict'

const db = require('APP/db')
const Cart = db.model('cart')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/:id', (req, res, next) => {
    console.log('hit the route')
    return Cart.findOne({
      where: {user_id: req.params.id}
    })
    .then(guestCart => {
      console.log('findOne user by userId', guestCart)
      guest_cart_items.findAll({
        where: {cart_id: guestCart.id}
      })
    .then(data => {
      console.log('found user cart', data)
        res.json(data)
      })
    })
    .catch(next)
  })

