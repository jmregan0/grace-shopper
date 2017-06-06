'use strict'

const db = require('APP/db');
const Availability = db.model('availability')
const Home = db.model('homes')

module.exports = require('express').Router()
  //Not sure if the 'get all' route is needed?
  .get('/', (res, req, next) => {
    Availability.findAll()
      .then(availabilities => res.json(availabilities))
      .catch(next)
  })
  .get('/:homeId', (res, req, next) => {
    Availability.find({
      where: {
        homeId: req.params.homeId,
      }
    })
      .then(availability => {
        if(availability) res.json(availability);
        else res.sendStatus(404);
      })
      .catch(next);
  })
