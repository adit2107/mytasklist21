const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	createdAt: {
		type: Date,
		default: Date.now()
	}
});

const User = mongoose.model("users", UserSchema);

module.exports = User;