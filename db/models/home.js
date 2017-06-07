'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


module.exports = db => db.define('homes', {
  name: Sequelize.STRING,
  location: Sequelize.STRING,
  description: Sequelize.TEXT,
  imageUrl: {
	  type: Sequelize.STRING,
    //defaultValue: '',
	  validate: {
	  		isUrl: true
	  		}
  },
  rating: Sequelize.FLOAT,
  price: Sequelize.FLOAT,
  //TODO: problem is that you could only book on stay at a time if you put a range on the home itself instead of creating individual days that are availability
  startDate: Sequelize.DATE,
  endDate: Sequelize.DATE,

},
{
  getterMethods: {
    excerpt: function() {
      return `${this.description.slice(0, 200)}...`;
    },
  }
})

module.exports.associations = (Home, {User}) => {
	Home.belongsTo(User, {as: 'Host'})

}


