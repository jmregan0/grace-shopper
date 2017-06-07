'use strict'

const {STRING} = require('sequelize')


//TODO: I assume this was a test file?
module.exports = db => db.define('things', {
  name: STRING,
})

module.exports.associations = (Thing, {User, Favorite}) => {
  // Thing.belongsToMany(User, {as: 'lovers', through: Favorite})
}
