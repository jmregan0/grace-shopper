'use strict'

const stripe = require("stripe")(keySecret);
const db = require('APP/db');
const { mustBeLoggedIn, forbidden } = require('./auth.filters');

module.exports = require('express').Router()

.get("/", (req, res) =>
  res.render('../app/views/index.pug', {keyPublishable}))

.post("/charge", (req, res) => {
  let amount = 12500;

  stripe.customers.create({
     email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Sample Charge",
         currency: "usd",
         customer: customer.id
    }))
  .then(charge => res.render("charge.pug"))
});
