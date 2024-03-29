const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: {type: String, required: true, lowercase: true, unique: true},
    uuid: String,
    likedArticles: {type: [String]},
    validEmail: {type: Boolean, required: true},
    isAdmin: {type: Boolean, required: true}
});

var User = mongoose.model('User', userSchema);

module.exports = User;