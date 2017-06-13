'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')

module.exports = db => db.define('transactions', {

  price: Sequelize.FLOAT,
  startDate: Sequelize.DATE,
  endDate: Sequelize.DATE,
  email: Sequelize.STRING

})

//TODO: reservation date should be on the availability
module.exports.associations = (Transaction, {Home, User}) => {
  Transaction.belongsTo(User, {as: 'host'});
  Transaction.belongsTo(User, {as: 'guest'});
  Transaction.belongsTo(Home);

}
