'use strict'

const db = require('APP/db');
const Availability = db.model('availability')
const Home = db.model('homes')

module.exports = require('express').Router()
  //Not sure if the 'get all' route is needed?
  .get('/', (req, res, next) => {
    Availability.findAll()
      .then(availabilities => res.json(availabilities))
      .catch(next)
  })
  .get('/:homeId', (req, res, next) => {
    console.log("homeId in availability", req.params.homeId)
    Availability.findAll({
      where: {
        home_id: req.params.homeId,
      }
    })
      .then(availability => {
        if(availability) res.json(availability);
        else res.sendStatus(404);
      })
      .catch(next);
  })
  .post('/', (req, res, next) =>
    Availability.create(req.body)
      .then(date => res.status(201).json(date))
      .catch(next))
