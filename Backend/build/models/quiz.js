"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const quizSchema = new Schema({
    quiz_title: {
        type: String,
        required: true
    },
    questions: [
        {
            question_text: {
                type: String,
                required: true
            },
            options: [
                {
                    option_text: {
                        type: String,
                        required: true
                    },
                    is_correct: {
                        type: Boolean,
                        required: true
                    }
                }
            ],
            answer_explanation: {
                type: String,
                required: true
            }
        }
    ]
});
const Quiz = mongoose.model("quiz", quizSchema, "quiz");
exports.default = Quiz;
//# sourceMappingURL=quiz.js.map