const mongoose = require('mongoose');
// const Schema = mongoose.Schema; this is same as line 3. called desctructuring
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
});

mongoose.model('users', userSchema);
