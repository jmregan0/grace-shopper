'use strict'

const db = require('APP/db');
const Availability = db.model('availability')
const Home = db.model('homes')
const moment = require('moment');

module.exports = require('express').Router({mergeParams: true})
  //Not sure if the 'get all' route is needed?
// GET /api/availability/?reserved=null
  // .get('/', (req, res, next) => {
  //   Availability.findAll()
  //     .then(availabilities => res.json(availabilities))
  //     .catch(next)
  // })
//TODO: make this RESTful
// making request to /api/availability/:homeId
// either do /api/availability/?homeId=abc
// or do /api/home/:homeId/availabilities

  .get('/', (req, res, next) => {
    Availability.findAll({
      order: 'id ASC',
      where: {
        home_id: req.params.id,
      }
    })
      .then(availability => {
        if(availability) res.json(availability);
        else res.sendStatus(404);
      })
      .catch(next);
  })
  .post('/', (req, res, next) =>{
    let startDate = moment(req.body.startDate, "YYYY/MM/DD");
    let endDate = moment(req.body.endDate, "YYYY/MM/DD");

    let diff = endDate.diff(startDate, 'days');
    let dateRange = [new Date(startDate)];

    for(let i = 0; i < diff; i++) {
      dateRange.push(new Date(startDate.add(1, 'days')));
    }
    console.log('dates', dateRange);

    Promise.all(dateRange.map(date => Availability.create({
      date,
      home_id: req.params.id,
    })))
      .then(dateArr => res.status(201).json(dateArr))
      .catch(next)

  })


