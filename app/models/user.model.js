//this file like MIGRATION at Laravel

module.exports = (sequelize, Sequelize) => {
	//define(table_name, {columns})
	const User = sequelize.define('ms_user', {
		id: {
			type: Sequelize.UUID,//uniqueidentifier in mysql = char(36)
			defaultValue: Sequelize.UUIDV4,//default value for uuid
			primaryKey: true
		},
		email: {
			type: Sequelize.STRING,
			unique: true,//unique key
			allowNull: false
		},
		password:{
			type: Sequelize.STRING,
			allowNull: false
		},
		is_active:{
			type: Sequelize.BOOLEAN,//TINIINT
			defaultValue: true
		}
	}, {
		freezeTableName: true//used to avoid plural from sequelize
	})

	return User;
}