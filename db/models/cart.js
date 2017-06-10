'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')
var {STRING} = require('sequelize');

module.exports = db => db.define('cart', {
  // column: STRING
})

module.exports.associations = (Cart, {User, Availability}) => {
	Cart.belongsTo(User)
	Cart.belongsToMany(Availability, {through: 'guest_cart_items'})
	// Cart.hasOne(User)
}
