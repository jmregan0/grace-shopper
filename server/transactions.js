'use strict'

const db = require('APP/db')
const Transaction = db.model('transactions')
const Home = db.model('homes')
const User = db.model('users')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router({mergeParams: true})
  .get('/guest', (req, res, next) => {
    Transaction.findAll({
      where: {guest_id: req.params.id},
      include: [{model: Home }]
    })
    .then(guestTransactions => {
      res.json(guestTransactions)
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
    (req, res, next) =>
      Transaction.create(req.body)
      .then(transaction => res.status(201).json(transaction))
      .catch(next))
