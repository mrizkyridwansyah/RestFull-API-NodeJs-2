const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	HOST: process.env.HOST,
	USER: process.env.USER,
	PASSWORD: process.env.PASSWORD,
	DB: process.env.DB,
	dialect: 'mysql',//to config what query of dbms you use
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}//like time limit 
}