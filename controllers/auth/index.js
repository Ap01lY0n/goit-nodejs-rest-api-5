const { login, logout, register } = require('./auth.js');
const changeAvatar = require('./changeavatar.js');
module.exports = {
	register,
	login,
	logout,
	changeAvatar,	
};
