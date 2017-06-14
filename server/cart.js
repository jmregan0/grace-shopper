'use strict'

const db = require('APP/db');
const Cart = db.model('cart');
const Availability = db.model('availability');
const Homes = db.model('homes');
const User = db.model('users');
const guest_cart_items = db.model('guest_cart_items');

const { mustBeLoggedIn, forbidden } = require('./auth.filters');
const moment = require('moment');

module.exports = require('express').Router()

.post('/sessioncart', (req, res, next) => {
    var rb = req.body;

    console.log("before", req.session);

    Availability.findAll({
        order: 'date ASC',
        where: {
            
            date: {
                $between: [rb.startDate, rb.endDate],

            },
            home_id: rb.homeId,
        },
        include: [
            { model: Homes }
        ]
    })
    .then(avails=>{
        avails=avails.map((avail)=>{
            return avail.dataValues.id
        })
       
        if (req.session.cart) {
            
            req.session.cart = req.session.cart.concat(avails);

        } else {
            req.session.cart = avails;
        }
        req.session.cart = req.session.cart.filter(function(item, pos) {
            return req.session.cart.indexOf(item) === pos;
        })   
        console.log(req.session)
        res.status(200);
        res.send(req.session);
    })

})



.get('/sessioncart', (req, res, next) => {

    var availIds = req.session.cart;
    var avails = availIds.map((availId)=>{
        return Availability.findOne({
            where: {id:availId},
            include: [
                { model: Homes }
            ]
        })
    })
    Promise.all(avails)
    .then((avails)=>{
        res.json(avails)
    })


})

.delete('/sessioncart', (req, res, next) => {
    
    req.session.cart = [];
    res.sendStatus(203)
})

.post('/sync/:id', (req, res, next) => {


    var availIds = req.session.cart;
    var avails = availIds.map((availId)=>{
        return Availability.findOne({
            where: {id:availId},
            include: [
                { model: Homes }
            ]
        })
        .then(avail=>{
            Cart.findOne({
                where: { user_id: req.params.id }
            })
            .then((cart)=>{
                cart.addAvailability(avail)
            })
        })
    })
    Promise.all(avails)
    .then((avails)=>{
        return Cart.findOne({
                where: { user_id: req.params.id }
            })
    })
    .then((cart)=>{
        res.json(cart)
    })


})

.delete('/:id', (req, res, next) => {

    return User.findOne({
      where: {id: req.user.id}
    })
    .then((user)=>{
        return user.getCart()
    })
    .then(cart => {
        console.log("no cart?", cart)
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

.delete('/sessioncart/:id', (req, res, next) => {
console.log("we've hit sub big time")
    for(var i = 0;i<req.session.cart.length;i++){
        if(req.session.cart[i]==req.params.id){
            console.log("we've hit the big time")
            req.session.cart.splice(i, 1)
        }
    }
    res.sendStatus(203)

})

.get('/:id', (req, res, next) => {
    return Cart.findOne({
            where: { user_id: req.params.id }
        })
        .then(guestCart => {
            if (guestCart === null) {
                return Cart.create({ user_id: req.params.id })
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


    console.log(req.session)
    req.session.tag = "hello"
    Availability.findAll({
            order: 'date ASC',
            where: {
                date: {
                    $between: [req.body.startDate, req.body.endDate]
                },
                home_id: req.body.homeId,
            }

        })
        .then(availabilities => {
            if (req.session) {
                req.session.cart = availabilities;
            }
            Cart.findOne({
                    where: { user_id: req.params.id }
                })
                .then((cart) => {
                    res.sendStatus(201)
                    return cart.addAvailabilities(availabilities)
                })
        })
        .catch(console.log.bind(console))
})
