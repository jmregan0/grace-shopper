'use strict'

const db = require('APP/db')
const Home = db.model('homes')

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
      Home.findAll()
        .then(homes => res.json(homes))
        .catch(next))
  .post('/',
    (req, res, next) =>
      Home.create(req.body)
      .then(home => res.status(201).json(home))
      .catch(next))
  .get('/:id',
    mustBeLoggedIn,
    (req, res, next) =>
      Home.findById(req.params.id)
      .then(home => res.json(home))
      .catch(next))
  .delete('/:id', (req, res, next) =>
    Home.destroy({
      where: {id: req.params.id}
    })
    .then(deleted =>
      res.sendStatus(202))
    .catch(next)
  )
