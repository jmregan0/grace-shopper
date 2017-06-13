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
    // Availability.findAll({
    //   order: 'id ASC',
    //   include: [
    //       { model: Homes }
    //     ],
    //   where: {
    //     date:{
    //       $between: [rb.startDate, rb.endDate]
    //     },
    //     home_id: rb.homeId,
    //   }

    // })
    // .then((avails)=>{
      
      // avails=avails.map(avail=>{
      //   avail.dataValues.home ={
      //     name:avail.dataValues.home.dataValues.name,
      //     price:avail.dataValues.home.dataValues.price,
      //     imageUrl:avail.dataValues.home.dataValues.imageUrl
      //   };
      //   avail = avail.dataValues;
      //   return {
      //     avail
      //   }
      // })
      //compressing instance info into cookie
      // console.log("----avails", avails[0])
      console.log("before", req.session)
      
      // if(Object.keys(req.session).length!==0 && req.session.cart){
      if(req.session.cart){
        // console.log("line 33", req.session.cart.length)
       req.session.cart=req.session.cart.concat(rb)
        
      }else{
        req.session.cart=[rb]
      }
      // console.log("after", req.session.cart.length)
      res.status(200)
      res.send(req.session)
      
      
    // })

  })



  .get('/sessioncart', (req, res, next) => {
    console.log("from api/cart/sessionsuser", req.session)
    if(req.session){
      console.log("GET ROUTE SESSION CART", req.session)
      res.status(200).json(req.session.cart) 
    }else{
      res.send("no items in session cart")
    }
  })



  .delete('/sessioncart', (req, res, next) => {
    console.log("ATTEMPTING TO DELETE")
    req.session.cart=[];
    res.senStatus(203)

  })



  .post('/sync/:id', (req, res, next) => {
    availAbbrev = req.session.cart;
    Cart.findOne({
      where: {user_id: req.params.id}
    })
    .then(cart=>{
    
      var availProm=availAbbrev.map(avail=>{
        Availability.findAll({
                order: 'id ASC',
                where: {
                  date:{
                    $between: [avail.startDate, avail.endDate]
                  },
                  home_id: avail.homeId,
                }

        })
        .then((avails)=>{
          return cart.addAvailabilities(avails)
        })
      })  

      Promise.all(availProm)
      req.session.cart = [];
      res.status(200).send("hopefully cart synced")
      //cart.addAvailabilities(req.session.cart)
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
      if(req.session){
        req.session.cart=availabilities;
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


