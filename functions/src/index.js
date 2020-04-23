import express from 'express';
import {
  getAllQuizzes,
  getQuiz,
  createQuiz,
  editQuiz,
  deleteQuiz,
} from './APIs/quiz';
import { loginUser, signUpUser } from './APIs/user';

const functions = require('firebase-functions');

const app = express();

app.get('/quizzes', getAllQuizzes);
app.get('/quiz/:quizId', getQuiz);
app.post('/quiz', createQuiz);
app.put('/quiz/:quizId', editQuiz);
app.delete('/quiz/:quizId', deleteQuiz);

app.post('/login', loginUser);
app.post('/signup', signUpUser);

exports.api = functions.region('europe-west1').https.onRequest(app);
