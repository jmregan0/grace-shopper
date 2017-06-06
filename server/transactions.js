'use strict'

const db = require('APP/db')
const Transaction = db.model('transactions')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    // The forbidden middleware will fail *all* requests to list users.
    // Remove it if you want to allow anyone to list all users on the site.
    //
    // If you want to only let admins list all the users, then you'll
    // have to add a role column to the users table to support
    // the concept of admin users.
    //forbidden('listing users is not allowed'),
    (req, res, next) =>
      Transaction.findAll()
        .then(trips => res.json(trips))
        .catch(next))
  .post('/',
    (req, res, next) =>
      Transaction.create(req.body)
      .then(trip => res.status(201).json(trip))
      .catch(next))
