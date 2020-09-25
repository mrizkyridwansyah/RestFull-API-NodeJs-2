module.exports = app => {
	const user = require('../controllers/user.controller.js');

	let router = require('express').Router();

	//create a new user
	router.post('/', user.create);
	router.get('/', user.find);
	router.get('/:id', user.getById);
	router.put('/:id', user.update);
	router.put('/updatePass/:id', user.updatePass);
	router.delete('/:id', user.delete);

	app.use('/api/user',router);
}