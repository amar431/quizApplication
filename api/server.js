import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import authRouter from './routes/auth.route.js'
import quizRoute from './routes/auth.quiz.js'
import resultRouter from './routes/auth.result.js'
import cors from 'cors'
const port = process.env.PORT || 3000;
dotenv.config()
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Mongodb is Connected")
}).catch((err)=>{
    console.log(`MongoDb error is ${err}`)
})
const app = express()
app.use(
    cors({
      origin: 'http://localhost:3001', // Allow requests from this origin
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these HTTP methods
      credentials: true, // Allow credentials like cookies
    })
  );
  
  
app.use(cookieParser());


app.use(express.json());


app.use('/api/auth', authRouter);

app.use('/api/auth',quizRoute)

app.use('/api', resultRouter);


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Error Code'
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})
app.listen(3000,()=>{
    console.log("server running on 3000")
})