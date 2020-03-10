const mongoose  = require('mongoose');
const AppStatus = require('./appStatus');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  applicationUrl: {type: String},
  documentUrl:    {type: String},
  imageUrl:       {type: String},
  number:         {type: Number},
  city:           {type: String},
  hasApplied:{type: Boolean, default: false},
  password: {type: String, required: true, unique: true},
  email:    {type: String, required: true, unique: true},
  userName: {type: String, required: true},
  isAdmin:  {type: Boolean, required: true},
  requests: [{type: Schema.Types.ObjectId,ref:'User'}],
  friends:  [{type: Schema.Types.ObjectId,ref:'User'}],
  pending:  [{type: Schema.Types.ObjectId,ref:'User'}],
  appStatus:[{type: Schema.Types.ObjectId, ref:'AppStatus'}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;