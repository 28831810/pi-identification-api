const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    surname: String
});

module.exports = mongoose.model('User', usersSchema);