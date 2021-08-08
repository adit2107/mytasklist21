const bcrypt = require('bcryptjs')
const User = require('../../models/user')
const userRouter = require('express').Router()
const { check, validationResult } = require("express-validator/check");

const register = async (req, res) => {
     
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send(errors);
      }
        const { email, password } = req.body;

        const user = await User.findOne({
            email
        })
        if (user) return res.status(400).send({message: `This e-mail is already registered!`});

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
    
        const newUser = await new User({
            email,
            password: hashPassword,
          });  
        const userDetails = await newUser.save();
        res.status(201).send({ meta: {}, data: { id: userDetails.id }});
      } catch (error) {
        res.status(400).send({ error });
      }

}

const verify = [
  check('email', 'Please enter an valid e-mail').isEmail(),
  check('password', 'Please enter a valid password').notEmpty()
]

module.exports = userRouter.post('/register', verify, register)