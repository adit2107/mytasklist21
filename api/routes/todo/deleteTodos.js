const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const Todo = require('../../models/todo');
const verifyJwt = require('../../_helpers/verifyJwt');
const todoRouter = require('express').Router()
const { check, validationResult } = require("express-validator/check");

const deleteTodo = async (req, res) => {

try {
    const { id } = req.params;

    const todo = await Todo.findById(id);

    if (!todo) return res.status(404).send({ message: `Task not found!`});
    if (todo.userId.toString() !== req.user.id) return res.status(404).send({ message: `Unauthorized access!`})
    if (todo) {
        todo.deleteOne({
            _id: id
        })
    }

    res.send({ data: { message: `Deleted task successfully!`}})

    } catch (err) {
    res.status(400).send(err)
    }
}

const verify = [
    check('task', 'Please enter a task').notEmpty(),
 ]
 

module.exports = todoRouter.delete('/todo/:id', verifyJwt, deleteTodo)