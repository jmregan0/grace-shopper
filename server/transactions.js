'use strict'

const db = require('APP/db')
const Sequelize = require('sequelize')
const Home = db.model('homes')
const Transaction = db.model('transactions')
const User = db.model('users')
const moment = require('moment')
const nodemailer = require('nodemailer');
const transporter = require('./transporter')
const {mustBeLoggedIn, forbidden} = require('./auth.filters')

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
      Transaction.create(req.body)
      .then(transactions => {
        const gettingHome = Home.findById(req.body.home_id)
        const gettingHost = User.findById(req.body.host_id)
        const gettingUser = User.findById(req.body.guest_id)
        User.findById(req.body.guest_id)
        .then((user)=>{
          user.getCart()
          .then(cart=>{
            cart.setAvailabilities([])
          })
        })
        return Promise.all([transactions, gettingHome, gettingHost, gettingUser])
      })
      .then(([transaction, home, host, user]) => {
        res.status(201).json(transaction)
        var mailOptions = {
          from: 'GalacticBnB <colickyboy@gmail.com>',
          to: user.email,
          subject: 'Your GalacticBnB reservation is set',
          html: '<p>Hello, ' + user.name + '!</p><p>Thank you for reserving a home through GalacticBnB.</p><p>This is your order confirmation. Please save this for future reference.</p><p>Reservation details:</p><p><strong>Staying at:</strong> ' + home.name + '</p><p><strong>Host:</strong> ' + host.name + '</p><p><strong>Price:</strong> ' + transaction.price + '</p><p><strong>Check-in:</strong> ' + moment(res.startDate, "MM/DD/YYYY") + '</p><p><strong>Checkout:</strong> ' + moment(res.endDate, "MM/DD/YYYY") + '</p><p>We hope you enjoy your stay at ' + home.name + '!</p><p>Sincerely,</p><p>The GalacticBnB Team</p>'
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
