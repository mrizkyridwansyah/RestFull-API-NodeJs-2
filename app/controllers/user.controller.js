const db = require('../models');
const md5 = require('md5');
const User = db.users;
//options used to config where clause
const options = db.Sequelize.Op;

//Method for Users

//find records
exports.find = (req, res) => {	
	let whereEmail = req.query.email ? {
		email: {
			[options.like] : '%' + req.query.email +'%'
		}
	} : null;

	let whereActive = req.query.active ? {
		is_active: req.query.active
	} : null;

	let condition = {
		[options.or]: [whereEmail, whereActive]
	};

	User.findAll({ where: condition})
		.then((data) => {
			res.send(data);
		}).catch((error) => {
			res.status(500).send({
				message: error.message || "Something wrong when get user"
			})
		})
}

//find records by PK
exports.getById = (req, res) => {
	let ID = req.params.id;
	User.findAll({
		where : {
			id: ID
		}
	})
	.then((data) => {
		res.send(data);
	}).catch((error) =>{
		res.status(500).send({
			message: error.message || "Something wrong when find user"
		})
	})
}

//Create record
exports.create = (req, res) => {
	if(!req.body.email || !req.body.password){
		res.status(400).send({
			message: 'Email & Password are required'
		})
	}

	const data = {
		email: req.body.email,
		password: md5(req.body.password)
	}
	
	//using method create from module sequelize
	User.create(data)
		.then((result) =>{
			res.send(result);
		}).catch((error) => {
			res.status(500).send({
				message: error.message || 'Something wrong when create user'
			})
		})
}

//Update record by PK
exports.update = (req, res) => {
	const id = req.params.id;

	const data = {
		email: req.body.email,
		is_active: req.body.active
	}

	User.update(data, {
		where : { id: id}
	}).then((result) => {
		if(result == 1){
			res.send({
				message: "User's updated succesfully"
			})
		}
		else{
			res.send({
				message: "User fail to update"
			})			
		}
	}).catch((error) => {
		res.status(500).send({
			message: error.message || 'Something wrong when create user'
		})
	})
}

//Update password by PK
exports.updatePass = (req, res) => {
	const id = req.params.id;

	User.update({ password : md5(req.body.password) }, {
		where : { id: id}
	}).then((result) => {
		if(result == 1){
			res.send({
				message: "User's updated password succesfully"
			})
		}
		else{
			res.send({
				message: "User fail to update password"
			})			
		}
	}).catch((error) => {
		res.status(500).send({
			message: error.message || 'Something wrong when create user'
		})
	})
}

//Delete record by PK
exports.delete = (req, res) => {
	const id = req.params.id;
	User.destroy({ where : { id : id }})
		.then((result) => {
			if(result == 1){
			res.send({
				message: "User's deleted succesfully"
			})
			}
			else{
				res.send({
					message: "User fail to delete"
				})			
			}
		}).catch((error) => {
			res.status(500).send({
				message: error.message || 'Something wrong when create user'
			})			
		})
}
