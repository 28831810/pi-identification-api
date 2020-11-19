const mongoose = require('mongoose');

const userInfoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    quantity: {type: Number, default: 1}
});

module.exports = mongoose.model('UserInfo', userInfoSchema);