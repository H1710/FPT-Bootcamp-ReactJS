const { QuizController } = require("../controllers/quizController");

const router = require("express").Router();

router.post("/quiz/create", QuizController.createQuiz);
router.get("/quiz/get/:quizCode", QuizController.getQuiz);
router.post("/quiz/result/:quizCode", QuizController.checkAnswer);

module.exports = router;
