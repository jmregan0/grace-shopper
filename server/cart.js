'use strict'

const db = require('APP/db')
const Cart = db.model('cart')
const Availability = db.model('availability')
const Homes = db.model('homes')
const guest_cart_items = db.model('guest_cart_items')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/:id', (req, res, next) => {
    return Cart.findOne({
      where: {user_id: req.params.id}
    })
    .then(guestCart => {
      if(guestCart === null){
        return Cart.create({user_id: req.params.id})
        .then(newCart => res.json(newCart))
      } else {
        return guestCart.getAvailabilities({
          include: [
            { model: Homes }
          ]
        })
        .then(foundItems => res.json(foundItems))
      }
    })
  })

  .post('/:id', (req, res, next) => {

    var ok = req.body;


    Availability.findAll({
      order: 'id ASC',
      where: {
        date:{
          $between: [ok.startDate, ok.endDate]
        },
        home_id: ok.homeId,
      }

    })
    .then(availabilities => {
        Cart.findOne({
          where: {user_id: req.params.id}
        })
        .then((cart)=>{
          res.sendStatus(201)
          return cart.addAvailabilities(availabilities)
        })
    })
    .catch(console.log.bind(console))
  })

  .delete('/:id', (req, res, next) => {
    return Cart.findOne({
      where: {id: req.user.id}
    })
    .then(cart => {
      Availability.findOne({
        where: {id: req.params.id}
      })
      .then(avail => {
        return cart.removeAvailability(avail)
      })
      .then(deleted => {
        res.sendStatus(200)
      })
    })
    .catch(next)
  })

