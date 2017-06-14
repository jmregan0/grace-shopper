'use strict'

const db = require('APP/db')
const User = db.model('users')
const Cart = db.model('cart')
const nodemailer = require('nodemailer')
const transporter = require('./transporter')
const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    // The forbidden middleware will fail *all* requests to list users.
    // Remove it if you want to allow anyone to list all users on the site.
    //
    // If you want to only let admins list all the users, then you'll
    // have to add a role column to the users table to support
    // the concept of admin users.
    // forbidden('listing users is not allowed'),
    (req, res, next) =>
      User.findAll()
        .then(users => res.json(users))
        .catch(next))
  .post('/',
    (req, res, next) =>{
//--------------------------
      return User.create(req.body)
        .then(user => {
          console.log(user)
          Cart.create()
          .then(cart=>{
            cart.setUser(user)
          })
          res.status(201).json(user)
//--------------------------
          var mailOptions = {
          from: 'GalacticBnB <colickyboy@gmail.com>',
          to: user.email,
          subject: 'Your GalacticBnB account is created',
          html: '<p><strong>Welcome, ' + user.name + '!</strong></p><p>Thank you for opening an account with GalacticBnB, where you\'ll find the multiverse\'s most unique homes here.</p><p>To sign in, use the email address that you signed up with, which was ' + user.email + '. </p><p>Happy home hunting!</p><p>Sincerely,</p><p>The GalacticBnB Team</p>'
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
    }
  )
  .get('/:id',
    mustBeLoggedIn,
    (req, res, next) =>
      User.find({
        where: {id: req.params.id}
      })
      .then(user => res.json(user))
      .catch(next))
  .use('/:id/transactions', require('./transactions'))
  .use('/:id/homes', require('./homes'))
