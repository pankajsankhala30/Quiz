"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAQuiz = exports.getAllQuizes = void 0;
const quiz_1 = require("../models/quiz");
let getAllQuizes = (req, res) => {
    console.log(req, "s ds");
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    quiz_1.default.find((err, allscores) => {
        if (err) {
            res.send("Error!");
        }
        else {
            res.send(allscores.slice(offset, offset + limit));
        }
    });
};
exports.getAllQuizes = getAllQuizes;
let createAQuiz = (req, res) => {
    const quiz = new quiz_1.default({
        quiz_title: req.body.quiz_title,
        questions: req.body.questions
    });
    quiz.save((error, quiz) => {
        if (error) {
            return res.status(500).send(error);
        }
        else {
            return res.status(200).send(quiz);
        }
    });
};
exports.createAQuiz = createAQuiz;
//# sourceMappingURL=quizController.js.map