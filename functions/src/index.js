import express from 'express';
import auth from './util/auth';
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

app.get('/quizzes', auth, getAllQuizzes);
app.get('/quiz/:quizId', auth, getQuiz);
app.post('/quiz', auth, createQuiz);
app.put('/quiz/:quizId', auth, editQuiz);
app.delete('/quiz/:quizId', auth, deleteQuiz);

app.post('/login', loginUser);
app.post('/signup', signUpUser);

exports.api = functions.region('europe-west1').https.onRequest(app);
