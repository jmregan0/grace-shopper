'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


module.exports = db => db.define('homes', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: Sequelize.TEXT,
  imageUrl: {
	  type: Sequelize.STRING,
    defaultValue: 'http://i.imgur.com/3BrMZK8.png',
	  validate: {
	  		isUrl: true
	  		}
  },
  rating: Sequelize.FLOAT,
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  }
},
{
  getterMethods: {
    excerpt: function() {
      if(this.description) return `${this.description.slice(0, 200)}...`;
      return 'No description yet!'
    },
  },
})

module.exports.associations = (Home, {User}) => {
	Home.belongsTo(User, {as: 'Host'})

}


