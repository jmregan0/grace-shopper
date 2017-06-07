'use strict'

const db = require('APP/db')
const moment = require('moment');

const Home = db.model('homes')
const User = db.model('users')
const Availability = db.model('availability')


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
      Home.findAll({order: 'id ASC'})
        .then(homes => res.json(homes))
        .catch(next))
//TODO: when creating a home, you don't want to recreate a home every time you want to list it as available,
// you should consider setting up a batch route on availability such that POST /api/availability
// in the body you would add startDate, endDate, and then it would create an individual availability for each day between the two
  .post('/',
    (req, res, next) => {

      let createdHome
      return Home.create(req.body)
      .then(home => {
        createdHome = home
        let startDate = moment(home.startDate, "YYYY/MM/DD");
        let endDate = moment(home.endDate, "YYYY/MM/DD");

        let diff = endDate.diff(startDate, 'days');
        let dateRange = [new Date(startDate)];

        for(let i = 0; i < diff; i++) {
          dateRange.push(new Date(startDate.add(1, 'days')));
        }
        console.log('dates', dateRange);

        return Promise.all(dateRange.map(date => Availability.create({
          date,
          home_id: home.id
        })))
      })
      .then(dateArr => {
        res.status(201).json(createdHome)
      })
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
  .delete('/:id', (req, res, next) =>
    Home.destroy({
      where: {id: req.params.id}
    })
    .then(deleted =>
      res.sendStatus(202))
    .catch(next)
  )
