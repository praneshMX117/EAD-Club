const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const autoSchema = mongoose.Schema({
  name : { type : String , required : true },
  sequence_value : { type : Number , required : true }
});

autoSchema.plugin(uniqueValidator);

module.exports = mongoose.model('auto', autoSchema);
