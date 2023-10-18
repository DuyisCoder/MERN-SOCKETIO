const express = require('express');
const { chats } = require('./data/data');
const app = express()
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');
const color = require('colors');
const initUserRoute = require('./routes/userRoute');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
app.use(cors());
connectDB();
const PORT = process.env.PORT || 8888
app.use(express.json());

app.get('/', (req, res) => {
    res.send('HELLO HOME');
})

app.get('/api/chats', (req, res) => {
    res.send(chats);
})
app.get('/api/chats/:id', (req, res) => {
    const chatSingle = chats.find(item => item._id === req.params.id);
    res.send(chatSingle);
})
// app.use(notFound);
// app.use(errorHandler);
initUserRoute(app);

app.listen(8080,
    console.log("Server is running is " + PORT)
);