// routes/result.route.js
import express from 'express';
import { submitQuizResult, getUserResults, getAllResults } from '../controllers/result.controller.js';
import { verifyToken } from '../utils/verifyuser.js';

const router = express.Router();

// Submit quiz result
router.post('/result', verifyToken, submitQuizResult);

// Get user's quiz results
router.get('/user-results', verifyToken, getUserResults);

// Get all quiz results (admin or specific use case)
router.get('/all-results', verifyToken, getAllResults);



export default router;
