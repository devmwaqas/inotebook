const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://inotebook:inotebook@cluster0.hmeax.mongodb.net/inotebook";
// const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("connected to mongo successfully.");
    })
}

module.exports = connectToMongo;