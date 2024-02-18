const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    fullName: String,
    employer: { type: Boolean, default: false },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;