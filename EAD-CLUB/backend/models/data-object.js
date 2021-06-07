const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const detailSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: {type: String, required: true },
  password: {type: String,required:true}
});

detailSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Users', detailSchema);
