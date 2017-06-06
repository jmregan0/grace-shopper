'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('availability', {
  date: STRING
})

module.exports.associations = (Availability, {Home}) => {
  Availability.belongsTo(Home)
}
