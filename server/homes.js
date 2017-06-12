'use strict'

const db = require('APP/db')

const Home = db.model('homes')
const User = db.model('users')
const Availability = db.model('availability')

const moment = require('moment')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router({mergeParams: true})
  .get('/latest', (req, res, next) =>
    Home.findAll({
      limit: 4,
      order: 'id DESC'
    })
    .then(homes => res.json(homes))
    .catch(next)
  )
  .get('/userHomes', (req, res, next) =>
    Home.findAll({
      where: {host_id: req.params.id}
    })
    .then(homes => res.json(homes))
    .catch(next)
  )
  .get('/',
    // The forbidden middleware will fail *all* requests to list users.
    // Remove it if you want to allow anyone to list all users on the site.
    //
    // If you want to only let admins list all the users, then you'll
    // have to add a role column to the users table to support
    // the concept of admin users.
    //forbidden('listing users is not allowed'),
    (req, res, next) => {
      console.log('req.session', req.session)
      return Home.findAll({order: 'id ASC'})
        .then(homes => res.json(homes))
        .catch(next)
    })
//TODO: when creating a home, you don't want to recreate a home every time you want to list it as available,
// you should consider setting up a batch route on availability such that POST /api/availability
// in the body you would add startDate, endDate, and then it would create an individual availability for each day between the two
  .post('/',
    (req, res, next) => {

      //Code below closely resembles the post route for availability. Not sure how to refactor.
      let newHome;
      return Home.create(req.body)
      .then(home => {
          newHome = home
          // if req.body contains information related to start and end date, then also create availability instances corresponding to the included dates
          if(req.body.startDate && req.body.endDate) {
            return addAvailabilities(newHome.id, req.body.startDate, req.body.endDate)
              //once the availabilities have been created return the updated home
              .then(dateArr => newHome)
              .catch(next)
          }
          //if req.body does not contain start and end date information, return the newly created home
          else return newHome
      })
      .then(home => res.status(201).json(home))
      .catch(next)
    })

  .get('/:id',
    (req, res, next) =>
      Home.find({
        where: {id: req.params.id},
        include: [
          {model: User, as: 'Host' }
        ]
      })
      .then(home => res.json(home))
      .catch(next))
  .put('/:id', (req, res, next) => {
      console.log('we hit the put route in homes', req.body);

      let savedHome;
      return Home.find({
        where: {id: req.params.id},
        include: [
          {model: User, as: 'Host' }
        ]
        })
        .then(home => home.update(req.body))
         .then(updatedHome => {
          savedHome = updatedHome;
            console.log('updated home in the then in the put route', updatedHome)
            // if req.body contains information related to start and end date, then also create availability instances corresponding to the included dates
            if(req.body.startAdd && req.body.endAdd){
              return addAvailabilities(updatedHome.id, req.body.startAdd, req.body.endAdd)
              //once the availabilities have been created return the updated home
              .then(dateArr => savedHome)
              .catch(next)
            }
            //if req.body does not contain start and end date information, return the newly created home
            else return savedHome
          })
         .then(home => res.json(home))
         .catch(next)
     })
  .delete('/:id', (req, res, next) =>
    Home.destroy({
      where: {id: req.params.id}
    })
    .then(deleted =>
      res.sendStatus(202))
    .catch(next)
  )
  .use('/:id/availability', require('./availability'))

  //for a give homeId, startDate, and endDate, add new availabilties in between startDate and endDate to the home
  const addAvailabilities = (homeId, startDate, endDate) =>{
    let startMom = moment(startDate, "YYYY/MM/DD");
    let endMom = moment(endDate, "YYYY/MM/DD");
    let daterange = [];

    //create array dateRange containing the dates of all the dates inbetween the specified range
    let diff = endMom.diff(startMom, 'days');
    let dateRange = [new Date(startMom)];
    for(let i = 0; i < diff; i++) {
      dateRange.push(new Date(startMom.add(1, 'days')));
    }

    //resolve an array of promises where each promise in the array creates a new availability instance. for put routes, the availability may already exist, so findOrCreate is called instead of create
    return Promise.all(dateRange.map(date => Availability.findOrCreate({
      where: {
      date,
      home_id: homeId,
    }})))

  }
