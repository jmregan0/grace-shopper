'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


module.exports = db => db.define('transactions', {

  transactionDate: Sequelize.DATE,
  //TODO: why add your own primary key or id? if not primary key, what is the use of this?
  transactionId: Sequelize.INTEGER,
  price: Sequelize.FLOAT,
  reservationDate: Sequelize.DATE

})


//TODO: reservation date should be on the availability
module.exports.associations = (Transaction, {Home, User}) => {
  Transaction.belongsTo(User, {as: 'Host'});
  Transaction.belongsTo(User, {as: 'Guest'});
  Transaction.belongsTo(Home);

}
