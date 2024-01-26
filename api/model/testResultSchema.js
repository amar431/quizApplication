// models/TestResult.js
import mongoose from "mongoose";

const testResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
  },
  userAnswer: {
    type: Number,
  },
  isCorrect: {
    type: Boolean,
  },
}, { timestamps: true });

const TestResult = mongoose.model('TestResult', testResultSchema);

export default TestResult;