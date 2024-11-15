const mongoose = require('mongoose');

const ApplymentFormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model('ApplymentForm', ApplymentFormSchema);
