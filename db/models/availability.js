'use strict'

const {DATE} = require('sequelize')
const moment = require('moment')

module.exports = db => db.define('availability', {
  date: DATE
},{
  getterMethods: {
    date: function() {
      return moment(this.getDataValue('date')).utc().format('MMMM D, YYYY')
    }
  }
})

module.exports.associations = (Availability, {Home}) => {
  Availability.belongsTo(Home)
}
