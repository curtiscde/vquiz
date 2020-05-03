import express from 'express';
import firebase from 'firebase';
import config from './util/config';
import {
  getAllQuizzes,
  getQuiz,
  createQuiz,
  editQuiz,
  deleteQuiz,
} from './APIs/quiz';
import { loginUser, signUpUser, getUser } from './APIs/user';
import teamApp from './APIs/team';

import cors from './middleware/cors';
import auth from './middleware/auth';

const functions = require('firebase-functions');

const app = express();

firebase.initializeApp(config.firebase);

app.use(cors);

app.get('/quizzes', auth, getAllQuizzes);
app.get('/quiz/:quizId', auth, getQuiz);
app.post('/quiz', auth, createQuiz);
app.put('/quiz/:quizId', auth, editQuiz);
app.delete('/quiz/:quizId', auth, deleteQuiz);

app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.get('/user', auth, getUser);

exports.api = functions.region('europe-west1').https.onRequest(app);
exports.team = functions.region('europe-west1').https.onRequest(teamApp);
