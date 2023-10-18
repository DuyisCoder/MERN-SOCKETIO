const express = require('express')
const app = express()
const route = express.Router();
const { registerUser, loginUser } = require('../controllers/userController')

const initUserRoute = (app) => {
    route.post('/register', registerUser);

    route.post('/login', loginUser)

    return app.use('/api/user', route)
}

module.exports = initUserRoute;