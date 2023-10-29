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
  lsQuiz: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
});

module.exports = mongoose.model("Quiz", quizSchema);
