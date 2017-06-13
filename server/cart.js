'use strict'

const db = require('APP/db');
const Cart = db.model('cart');
const Availability = db.model('availability');
const Homes = db.model('homes');
const guest_cart_items = db.model('guest_cart_items');

const {mustBeLoggedIn, forbidden} = require('./auth.filters');
const moment = require('moment');

module.exports = require('express').Router()

  .post('/sessioncart', (req, res, next) => {
    var rb = req.body;

      console.log("before", req.session);
      
      // if(Object.keys(req.session).length!==0 && req.session.cart){
      if(req.session.cart){
        // console.log("line 33", req.session.cart.length)
       req.session.cart=req.session.cart.concat(rb);
        
      }else{
        req.session.cart=[rb];
      }
      // console.log("after", req.session.cart.length)
      res.status(200);
      res.send(req.session);
      
      
    // })

  })



  .get('/sessioncart', (req, res, next) => {

    var arr = [];
    // console.log("from api/cart/sessionsuser", req.session)
    if(req.session.cart.length!==0){
      // console.log("GET ROUTE SESSION CART", req.session)

      var info = req.session.cart;
      var start = [info[0].startDate];
      

      info=info.map(info=>{

        return Availability.findAll({
          order: 'id ASC',
          where: {
            // date:info.startDate,
            date:{ 
              $between: [info.startDate, info.endDate],
              // $or: {
              //   $eq: moment(info.startDate).format("MMMM D YYYY"),
                // $eq: moment(info.endDate).format("MMMM D YYYY"),
              // }
            },
            home_id: info.homeId,
          },
          include: [
            { model: Homes }
          ]
        })
      })

      Promise.all(info)
      .then((avails)=>{

        if(avails.length>1){
          var ok = [].concat.apply(avails[0][0], avails.slice(1));
        }else{
          var ok = avails[0];
        }
      
        console.log("TEST", new Date(start), moment(start).format("MMMM D YYYY"), moment(ok[0].date).format("MMMM D YYYY"))
        res.status(200).json(ok);
       })

    }else{
      res.send("no items in session cart")
    }
  })



  .delete('/sessioncart', (req, res, next) => {
    console.log("ATTEMPTING TO DELETE")
    req.session.cart=[];
    res.sendStatus(203)

  })



  .post('/sync/:id', (req, res, next) => {

    var availAbbrev = req.session.cart;
    Cart.findOne({
      where: {user_id: req.params.id}
    })
    .then(cart=>{
    
      var availProm=availAbbrev.map(avail=>{

        return Availability.findAll({
                order: 'id ASC',
                where: {
                  date:{
                    $between: [avail.startDate, avail.endDate]
                  },
                  home_id: avail.homeId,
                }

        })
        .then((avails)=>{
          cart.addAvailabilities(avails)
        })
      })  
      console.log("*^*&(availprom from cart/sync", availProm)
      Promise.all(availProm)
      .then(()=>{
        Cart.findOne({
          where: {user_id: req.params.id}
        })
        .then((cart)=>{
            req.session.cart = [];
            res.status(200).json(cart)
        })
      })

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


