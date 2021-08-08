const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const Todo = require('../../models/todo');
const todoRouter = require('express').Router()

const verifyJwt = require('../../_helpers/verifyJwt');

const getTodos = async (req, res) => {
try {
    const { id } = req.user;
    const todos = await Todo.find({
        userId: id
    }).sort({
        completed: 1
    })

    res.send({ data: { todos }})

    } catch (err) {
    res.status(400).send(err)
    }
}

module.exports = todoRouter.get('/todos', verifyJwt, getTodos)