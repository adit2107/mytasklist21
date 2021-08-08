const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TodoListSchema = new Schema({
	task: {
		type: String,
		required: true
	},
	userId: {
		type: Schema.Types.ObjectId,
		required: true
	},
    createdAt: {
        type: Date,
        default: Date.now()
    },
	completed: {
		type: Boolean,
		default: false
	}
});

const TodoList = mongoose.model("todolist", TodoListSchema);

module.exports = TodoList;