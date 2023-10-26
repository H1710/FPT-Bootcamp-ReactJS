const Quiz = require("../models/quizModel");
const Question = require("../models/questionModel");
const filePath = "quiz-test.json";
const fs = require("fs");

class QuizController {
  static async createQuiz(req, res, next) {
    try {
      fs.readFile(filePath, "utf8", async (err, data) => {
        if (err) {
          console.error("Error reading the file:", err);
          return;
        }
        try {
          const quizData = JSON.parse(data);

          const quiz = await Quiz.create({
            quizCode: quizData.quizCode,
            title: quizData.title,
            description: quizData.description,
          });

          for (const val of quizData.lsQuizz) {
            const question = await Question.create({
              content: val.content,
              isMultiple: val.isMultiple,
              answer: val.answer,
            });
            quiz.lsQuizz.push(question._id);
          }
          await quiz.save();

          //   console.log(quiz);
          return res.status(200).send({ quiz: quiz });
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
        }
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async getQuiz(req, res, next) {
    try {
      const { quizCode } = req.params;
      const quiz = await Quiz.findOne({ quizCode: quizCode }).populate(
        "lsQuizz"
      );
      return res.status(200).send({ quiz: quiz });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}
exports.QuizController = QuizController;
