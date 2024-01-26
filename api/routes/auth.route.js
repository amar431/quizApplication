import express from 'express'
const router = express.Router();
import {register,login} from '../controllers/auth.controller.js'


// User Registration route
router.post('/register', register);

// User Login route
router.post('/login', login);

export default router