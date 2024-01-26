// populateQuestions.js
import mongoose from 'mongoose';
import fs from 'fs'
import Question from '../model/Questions.model.js'

// Database connection setup

mongoose.connect("mongodb+srv://batchuamarnathgupta1:amar@cluster0.ov2la6g.mongodb.net/?retryWrites=true&w=majority"); // Replace with your database connection URL
const db = mongoose.connection;

db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

db.once('open', async () => {
  console.log('Connected to MongoDB');

  // Read the JSON file with your questions
  const jsonData = fs.readFileSync('../data/questions.json', 'utf-8');
  const questionsData = JSON.parse(jsonData);

  // Insert questions into the database
  try {
    await Question.insertMany(questionsData.questions);
    console.log('Questions inserted successfully');
  } catch (error) {
    console.error(`Error inserting questions: ${error}`);
  }

  // Close the database connection
  db.close();
});