const mongoose = require('mongoose');

const ApplymentTypeSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model('ApplymentType', ApplymentTypeSchema);
