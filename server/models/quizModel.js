const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  quizCode: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  lsQuizz: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
});

module.exports = mongoose.model("Quiz", quizSchema);
