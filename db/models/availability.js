'use strict'

const {DATE} = require('sequelize')
const moment = require('moment')
const {ENUM} = require('sequelize');

module.exports = db => db.define('availability', {
  date: DATE,
  status: {
    type: ENUM('available', 'reserved'),
    defaultValue: 'available'
  }
},{
  getterMethods: {
    date: function() {
      return moment(this.getDataValue('date')).utc().format('MMMM D, YYYY')
    }
  }
})

module.exports.associations = (Availability, {Home, Cart}) => {
  Availability.belongsTo(Home)
  Availability.belongsToMany(Cart, {through: 'guest_cart_items'})
}
