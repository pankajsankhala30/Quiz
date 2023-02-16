
import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const answerSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  questions: [
    {
      question: {
        type: String,
        required: true
      },
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      options: [
        {
          text: {
            type: String,
            required: true
          },
          answer: {
            type: Boolean,
            default: false
          },
          _id: false
        }
      ],
    }
  ],
  score:{
    type: Number,
    required: true
  },
  answeredAt: {
    type: Date,
    default: Date.now
  }
}
  , { versionKey: false, omitUndefined: true });

const Answer = mongoose.model<mongoose.Document>("answer", answerSchema, "answer");
export default Answer;


