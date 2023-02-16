
import * as mongoose from "mongoose";

const Schema = mongoose.Schema;
const quizSchema = new Schema({
  accountid: {
    type: Number,
    required: true
  },
  quiz_title: {
    type: String,
    required: true
  },
  questions: [
    {
      question: {
        type: String,
        required: true
      },
      options: [
        {
          text: {
            type: String,
            required: true
          },
          isCorrect: {
            type: Boolean,
            required: true
          },
          _id: false
        }
      ],
      answer_explanation: {
        type: String,
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }


}, { versionKey: false, omitUndefined: true });
const Quiz = mongoose.model<mongoose.Document>("quiz", quizSchema, "quiz");
export default Quiz;
