import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  options: [{
    type: String,
    required: true,
  }],
  correctAnswer: {
    type: Number,
    required: true,
  },
});

const Question = mongoose.model('Question', questionSchema);
export default Question