const mongoose = require('mongoose');

const detailSchema = mongoose.Schema({
  name: { type: String, required: true },
  gender: {type: String, required: true },
  phone: {type: String,required:true}
});

module.exports = mongoose.model('Detail', detailSchema);
