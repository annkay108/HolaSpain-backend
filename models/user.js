const mongoose = require('mongoose');
const AppStatus = require('./appStatus');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true, unique: true},
  isAdmin: {type: Boolean, required: true},
  number: {type: Number},
  city: {type: String},
  friends: [{type: Schema.Types.ObjectId,ref:'User'}],
  requests: [{type: Schema.Types.ObjectId,ref:'User'}],
  pending: [{type: Schema.Types.ObjectId,ref:'User'}],
  appStatus: [{type: Schema.Types.ObjectId, ref: 'AppStatus'}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;