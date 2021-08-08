const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../../models/user')
const userRouter = require('express').Router()
const { check, validationResult } = require("express-validator/check");

const login = async (req, res) => {

const { email, password } = req.body

try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors);
    }

    const user = await User.findOne({
        email
    })

    if (!user) return res.status(400).send({ message: `Email is not registered!` })

    const verifiedPassword = await bcrypt.compare(password, user.password)

    if (!verifiedPassword) return res.status(400).send({ message: `Password is incorrect!` })

    const token = jwt.sign({ email, password, id: user.id }, process.env.SECRET);
    res.send({ data: { token, message: `Logged in successfully!`}})

    } catch (err) {
    res.status(400).send(err)
    }
}

const verify = [
    check('email', 'Please enter an valid e-mail').isEmail(),
    check('password', 'Please enter a valid password').notEmpty()
  ]

module.exports = userRouter.post('/login', verify, login)