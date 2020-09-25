const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');//object for init package
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	operatorAliases: false,
	pool: dbConfig.pool
});

const db = [];
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//connect ORM to model
db.users = require('./user.model.js')(sequelize, Sequelize);

module.exports = db;