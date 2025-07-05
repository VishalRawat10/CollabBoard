const mongoose = require("mongoose");

module.exports.connectToDb = async () => {
    return mongoose.connect(`${process.env.MONGO_DB_URI}/CollborationBoard`);
}