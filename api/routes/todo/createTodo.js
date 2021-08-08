const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const Todo = require('../../models/todo');
const verifyJwt = require('../../_helpers/verifyJwt');
const todoRouter = require('express').Router()
const { check, validationResult } = require("express-validator/check");

const createTodo = async (req, res) => {

try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors);
    }
    const user = await User.findById(req.user.id);

    if (!user) return res.status(400).send({ message: `User not found!` });
    const newTodo = new Todo({
        task: req.body.task,
        userId: user.id,
        completed: false
      });

    const todo = await newTodo.save();

    res.send({ data: { todo: { id: todo.id, task: todo.task, completed: todo.completed } }})

    } catch (err) {
    res.status(400).send(err)
    }
}

const verify = [
   check('task', 'Please enter a task').notEmpty(),
]

module.exports = todoRouter.post('/todos', verifyJwt, verify, createTodo)