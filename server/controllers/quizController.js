const Quiz = require("../models/quizModel");
const Question = require("../models/questionModel");

class QuizController {
  static async createQuiz(req, res, next) {
    try {
      const { quizData } = req.body;

      const quiz = await Quiz.create({
        quizCode: quizData.quizCode,
        title: quizData.title,
        description: quizData.description,
        time: quizData.time,
      });

      for (const val of quizData.lsQuiz) {
        const question = await Question.create({
          content: val.content,
          isMultiple: val.isMultiple,
          answer: val.answer,
        });
        quiz.lsQuiz.push(question._id);
      }
      await quiz.save();

      //   console.log(quiz);
      return res.status(200).send({ quiz: quiz, message: "Success" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async getQuiz(req, res, next) {
    try {
      const { quizCode } = req.params;
      const quiz = await Quiz.findOne({ quizCode: quizCode }).populate({
        path: "lsQuiz",
        select: "-answer.isCorrect",
      });
      // const transformedQuestions = quiz.lsQuiz.reduce((acc, question) => {
      //   acc[question._id] = question;
      //   return acc;
      // }, {});

      // return res
      //   .status(200)
      //   .send({ quiz: { ...quiz._doc, lsQuiz: transformedQuestions } });
      return res.status(200).send({ quiz: quiz });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async checkAnswer(req, res, next) {
    try {
      const { quizCode } = req.params;
      const { formData } = req.body;
      const quiz = await Quiz.findOne({ quizCode: quizCode }).populate(
        "lsQuiz"
      );
      let score = 0;
      for (const question of quiz.lsQuiz) {
        if (question.isMultiple) {
          let flag = true;
          for (const answer of question.answer) {
            if (answer.isCorrect) {
              const a = formData[question._id].find((element) => {
                return answer.id == element;
              });
              if (!a) {
                flag = false;
                break;
              }
            }
          }
          if (flag) score++;
        } else {
          const a = question.answer.find((element) => {
            return element.id === formData[question._id];
          });
          if (a?.isCorrect) score++;
        }
      }
      return res.status(200).json({ score: score });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}
exports.QuizController = QuizController;
