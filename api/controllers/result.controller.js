// controllers/result.controller.js
import TestResult from '../model/testResultSchema.js';
import User from '../model/User.js';
import Question from '../model/Questions.model.js';

// Submit quiz result
export const submitQuizResult = async (req, res, next) => {
  try {
    const { userId, questionId, userAnswer, isCorrect } = req.body;

    // Assuming `userId`, `questionId`, and `userAnswer` are sent in the request body

    // Validate the user, question, and answer
    const user = await User.findById(userId);
    const question = await Question.findById(questionId);

    if (!user || !question) {
      throw new Error('User or Question not found');
    }

    // Check if the user's answer is correct
    const pointsEarned = isCorrect ? 3 : -1;

    // Save the result to the database with points
    const result = new TestResult({
      user: userId,
      question: questionId,
      userAnswer,
      isCorrect,
      pointsEarned,
    });

    await result.save();

    // Update the user's points
    user.points += pointsEarned;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Quiz result submitted successfully',
    });
  } catch (error) {
    next(error);
  }
};


// Get user's quiz results
export const getUserResults = async (req, res, next) => {
  try {
    const userId = req.userId; // Assuming userId is attached to the request during token verification

    const results = await TestResult.find({ user: userId });

    res.status(200).json({
      success: true,
      results,
    });
  } catch (error) {
    next(error);
  }
};

// Get all quiz results (admin or specific use case)
export const getAllResults = async (req, res, next) => {
  try {
    const results = await TestResult.find();

    res.status(200).json({
      success: true,
      results,
    });
  } catch (error) {
    next(error);
  }
};