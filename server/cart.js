'use strict'

const db = require('APP/db')
const Cart = db.model('cart')
const Availability = db.model('availability')
const Homes = db.model('homes')
const guest_cart_items = db.model('guest_cart_items')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()

  .post('/sessioncart', (req, res, next) => {
    var rb = req.body;
    Availability.findAll({
      order: 'id ASC',
      where: {
        date:{
          $between: [rb.startDate, rb.endDate]
        },
        home_id: rb.homeId,
      }

    })
    .then((avails)=>{
      if(req.session.cart){
       req.session.passport.cart.push(avails)
        
      }else{
        req.session.passport={cart:avails}
      }
      console.log(req.session)
      res.sendStatus(200)
      
      
  })



  })

  .get('/sessioncart', (req, res, next) => {

    res.status(200).json(req.session.passport.cart) 

  })

  .delete('/sessioncart', (req, res, next) => {

    res.session.passport.cart={}

  })


  .post('/sync/:id', (req, res, next) => {

    Cart.findOne({
      where: {user_id: req.params.id}
    })
    .then(cart=>{
      cart.addAvailabilities(req.session.passport.cart)
    })

  })


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
    console.log(req.session)
    req.session.tag="hello"
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
      if(req.session.passport){
        req.session.passport.cart=availabilities;
      }
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


