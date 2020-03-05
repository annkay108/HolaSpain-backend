const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;

const AppStatusSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref:'User'},
    title: {type: String, required: true},
    description: {type: String, required: true}
 });

 const AppStatus = mongoose.model('AppStatus', AppStatusSchema);

 module.exports = AppStatus;