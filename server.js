const dotenv = require('dotenv');//TO READ .env file
const express = require('express');
const bodyParser = require('body-parser');//mempermudah request yg dikirim client
const cors = require('cors');//

//call models
const db = require('./app/models');
//init express
const app = express();
dotenv.config();
//list client yg bisa akses server.js
let whiteList = [
	'http://localhost:3000'
];

let corsOption = {
	origin: function (origin, callback) {
		if(whiteList.indexOf(origin) !== -1 || !origin){
			callback(null, true);
		} else { 
			callback(new Error('Not Allowed by CORS'));
		}
	}
}

//Sync database
db.sequelize.sync({ alter:true });

app.use(cors(corsOption));

//parse request application/json & x-www-form-urlencode
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//example api endpoint
app.get('/', (req, res) => {
	res.json({
		message: 'Welcome to RestFull API NodeJS'
	})
})

//Routes
require('./app/routes/user.routes.js')(app);

//activation server.js
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => { console.log(`Application is running on http://localhost:${PORT}`) });