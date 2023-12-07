const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  quizCode: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  time: {
    type: Number,
    min: 1,
  },
  lsQuiz: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
});

module.exports = mongoose.model("Quiz", quizSchema);
