const mongoose = require('mongoose')
require('dotenv').config();

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`Mongo connected ${connect.connection.host}`);
    } catch (error) {
        console.log(`Mongo error ${error.message}`);
        process.exit();

    }
}
module.exports = connectDB;