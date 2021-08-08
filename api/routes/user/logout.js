const userRouter = require('express').Router()

const logout = async (req, res) => {
try {
    res.cookie('jwt', '', { maxAge: 1 });
    res.send({ message: `logged out!`});
    } catch (err) {
    res.status(400).send(err)
    }
}

module.exports = userRouter.get('/logout', logout)