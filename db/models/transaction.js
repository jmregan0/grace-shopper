'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


module.exports = db => db.define('transactions', {

  transactionDate: Sequelize.DATE, 
  transactionId: Sequelize.INTEGER,
  price: Sequelize.FLOAT,
  startDate: Sequelize.DATE

})



module.exports.associations = (Transaction, {Home, User}) => {
  Transaction.belongsTo(User, {as: 'Host'});
  Transaction.belongsTo(User, {as: 'Guest'});
  Transaction.belongsTo(Home);

}
