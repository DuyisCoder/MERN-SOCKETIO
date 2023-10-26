const express = require('express')
const app = express()
const route = express.Router();
const { registerUser, loginUser, getAllUser } = require('../controllers/userController')
const { protect } = require("../middleware/authMiddleware")
const initUserRoute = (app) => {
    route.post('/register', registerUser);

    route.post('/login', loginUser)
    route.get('/', protect, getAllUser)

    return app.use('/api/user', route)
}

module.exports = initUserRoute;