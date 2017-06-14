'use strict'

const db = require('APP/db')
const Sequelize = require('sequelize')
const Home = db.model('homes')
const Transaction = db.model('transactions')
const User = db.model('users')
const nodemailer = require('nodemailer');
const {mustBeLoggedIn, forbidden} = require('./auth.filters')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
        // xoauth2: xoauth2.createXOAuth2Generator({
            user: 'colickyboy@gmail.com',
            clientId: '540263018909-svsmsmsj0vjmmctjgd7o0m9pliu0g9v3.apps.googleusercontent.com',
            clientSecret: 'nsh8SVcFYKwy4kKflIZgQrCf',
            refreshToken: '1/V3kw9UjXbVImh5qQV3w43_mAZZ8XoVbg4uF63bg51vk',
            accessToken: 'ya29.GltoBIuYWqOyq-FIaQfIZgs2xSH92g0SVfAzrIceh1z4zJxK0NMFBg3QlGxZn64v25WUfrPq_yQfjrLpewPE3Ujk6WiOKiTFJ1cCMA06qnnwBBHv6IbQGvLTbQtU'
        // })
    }
})

module.exports = require('express').Router({mergeParams: true})
  .get('/guestfuture', (req, res, next) => {
    Transaction.findAll({
      where: {
        guest_id: req.params.id,
        endDate: {$gte: Sequelize.NOW()}
      },
      include: [{all: true}]
    })
    .then(futureGuestTransactions => {
      console.log("futureGuestTransactions", futureGuestTransactions)
      res.json(futureGuestTransactions)
    })
    .catch(next)
  })
  .get('/guestpast', (req, res, next) => {
    Transaction.findAll({
      where: {
        guest_id: req.params.id,
        endDate: {$lt: Sequelize.NOW()}
      },
      include: [{all: true}]
    })
    .then(pastGuestTransactions => {
      console.log("pastGuestTransactions", pastGuestTransactions)
      res.json(pastGuestTransactions)
    })
    .catch(next)
  })
  .get('/host', (req, res, next) => {
    Transaction.findAll({
      where: {host_id: req.params.id},
      include: [{all: true}]
    })
    .then(hostTransactions => {
      res.json(hostTransactions)
    })
    .catch(next)
  })
  .get('/',
    // The forbidden middleware will fail *all* requests to list users.
    // Remove it if you want to allow anyone to list all users on the site.
    //
    // If you want to only let admins list all the users, then you'll
    // have to add a role column to the users table to support
    // the concept of admin users.
    //forbidden('listing users is not allowed'),
    (req, res, next) => {
      Transaction.findAll({
      })
      .then(transactions => {
        res.json(transactions)
      })
      .catch(next)
    })
  .post('/',
    (req, res, next) => {
      console.log('req.body',req.body)

      Transaction.create(req.body)
      .then(res => {
        console.log("res", res)
        console.log("req.body", req.body)
        const gettingHome = Home.findById(req.body.home_id)
        const gettingUser = User.findById(req.body.guest_id)

        User.findById(req.body.guest_id)
        .then((user)=>{
          user.getCart()
          .then(cart=>{
            cart.setAvailabilities([])
          })
        })


        return Promise.all([res.data, gettingHome, gettingUser])
      })
      .then(([transaction, home, user]) => {
        console.log('stuff', transaction, home, user)
        res.status(201).json(transaction)
        var mailOptions = {
          from: 'GalacticBnB <colickyboy@gmail.com>',
          to: 'robtong21@gmail.com',
          subject: 'Your GalacticBnB reservation is set',
          html: 'Thank you for reserving a home through GalacticBnB.<br/>We hope you enjoy your stay!'
        }
        transporter.sendMail(mailOptions, function (err, res) {
            if(err){
                console.log(err);
            } else {
                console.log('Email Sent');
            }
        })
      })

      .catch(next)
    })
