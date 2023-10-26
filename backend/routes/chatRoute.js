const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const route = express.Router();
const { accessChat, fetchChat, createGroupChat, renameGroup, addToGroup, removeGroup } = require('../controllers/chatControllers')


const chatRoute = (app) => {
    route.post('/', protect, accessChat);
    route.get('/', protect, fetchChat);
    route.post('/group/create', protect, createGroupChat);
    route.put('/group/rename', protect, renameGroup);
    route.put('/group/add', protect, addToGroup);
    route.put('/group/remove', protect, removeGroup);

    return app.use('/api/chat', route);
}

module.exports = chatRoute;