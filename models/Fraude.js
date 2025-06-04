const mongoose = require('mongoose');

const fraudeSchema = new mongoose.Schema({
  type: { type: String, required: true },
  description: { type: String, required: true },
  signalePar: { type: String, required: true },
  dateSignalement: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Fraude', fraudeSchema);