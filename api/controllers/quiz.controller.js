// controllers/quizController.js
import Question from '../model/Questions.model.js';

export const getQuizQuestions = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ authenticated: false });
      }
      


  try {
    // Select 30 random questions from the database

    const randomQuestions = await Question.aggregate([{ $sample: { size: 30 } }]);

    // Divide the questions into two sets of 15 each
    const firstSet = randomQuestions.slice(0, 15);
    const secondSet = randomQuestions.slice(15, 30);

    return res.status(200).json({ authenticated: true, firstSet, secondSet });
  } catch (error) {
    return res.status(500).json({
      authenticated: false,
      message: 'Internal Server Error',
    });
  }
};