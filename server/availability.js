'use strict'

const db = require('APP/db');
const Availability = db.model('availability')
const Home = db.model('homes')

module.exports = require('express').Router()
  //Not sure if the 'get all' route is needed?
// GET /api/availability/?reserved=null
  .get('/', (req, res, next) => {
    Availability.findAll()
      .then(availabilities => res.json(availabilities))
      .catch(next)
  })
//TODO: make this RESTful 
// making request to /api/availability/:homeId
// either do /api/availability/?homeId=abc
// or do /api/home/:homeId/availabilities

  .get('/:homeId', (req, res, next) => {
    console.log("homeId in availability", req.params.homeId)
    Availability.findAll({
      order: 'id ASC',
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
