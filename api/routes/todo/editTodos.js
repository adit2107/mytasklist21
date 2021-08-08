const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const Todo = require('../../models/todo');
const verifyJwt = require('../../_helpers/verifyJwt');
const todoRouter = require('express').Router()
const { check, validationResult } = require("express-validator/check");

const editTodo = async (req, res) => {

try {
    const { id } = req.params;
    const { task } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors);
    }

    const todo = await Todo.findById(id);

    if (!todo) return res.status(404).send({ message: `Task not found!`});

    if (todo.userId.toString() !== req.user.id) return res.status(404).send({ message: `Unauthorized access!`})

    if (todo) {
        todo.task = task;
    }

    await todo.save()

    res.send({ data: { message: `Updated task successfully!`}})

    } catch (err) {
    res.status(400).send(err)
    }
}

const verify = [
    check('task', 'Please enter a task').notEmpty(),
 ]
 

module.exports = todoRouter.put('/todo/:id', verifyJwt, verify, editTodo)