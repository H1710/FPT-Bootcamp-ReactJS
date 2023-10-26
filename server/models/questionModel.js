const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  isMultiple: {
    type: Boolean,
    default: false,
  },
  answer: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Question", questionSchema);
