'use strict'

const db = require('APP/db');
const Availability = db.model('availability')
const Home = db.model('homes')
const moment = require('moment');

module.exports = require('express').Router({mergeParams: true}) //Do we need mergeParams?
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
    console.log(req.body)
    Availability.findAll({
      order: 'id ASC', //Would be a good spot for query params
      where: {
        home_id: req.params.id, //Doesn't exist, does it?
      }

    })
      .then(availability => {
        if(availability) res.json(availability);
        else res.sendStatus(404); //Are we handling this later?
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

    //This is a little excessive. An availability should just have start and end dates
    Promise.all(dateRange.map(date => Availability.create({
      date,
      home_id: req.params.id,
    })))
      .then(dateArr => res.status(201).json(dateArr))
      .catch(next)

  })

//Should this entire router be under /homes/availabilities?
  .get('/:homeId', (req, res, next) => {
    console.log(req.query)
    console.log(req.query.startDate, req.query.endDate)
    Availability.findAll({
      order: 'id ASC',
      where: {
        date:{
          $between: [req.query.startDate, req.query.endDate] //Might be a good usecase for query params
        },
        home_id: req.params.homeId,
      }

    })
    .then(availabilities => {
      if(availabilities) res.json(availabilities);
      else res.sendStatus(404);
    })
    .catch(next);
  })

