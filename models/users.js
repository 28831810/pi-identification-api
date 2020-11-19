const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    surname: {type: String, required: true},
    userImage: {type: String, required: false}
});

module.exports = mongoose.model('User', usersSchema);