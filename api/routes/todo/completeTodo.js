const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const Todo = require('../../models/todo');
const verifyJwt = require('../../_helpers/verifyJwt');
const todoRouter = require('express').Router()
const { check, validationResult } = require("express-validator/check");

const completeTodo = async (req, res) => {

try {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors);
    }

    const todo = await Todo.findById(id);

    if (!todo) return res.status(404).send({ message: `Task not found!`});

    if (todo.userId.toString() !== req.user.id) return res.status(404).send({ message: `Unauthorized access!`})

    if (todo) {
        todo.completed = req.body.completed;
    }

    await todo.save()

    res.send({ data: { message: `Updated task successfully!`}})

    } catch (err) {
    res.status(400).send(err)
    }
}

const verify = [
    check('completed', 'Value must be a boolean').isBoolean()
 ]
 

module.exports = todoRouter.put('/todo/complete/:id', verifyJwt, verify, completeTodo)