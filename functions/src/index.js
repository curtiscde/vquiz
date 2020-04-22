import express from 'express';
import { getAllQuizzes, getQuiz } from './APIs/quiz';

const functions = require('firebase-functions');

const app = express();

app.get('/quizzes', getAllQuizzes);
app.get('/quiz/:quizId', getQuiz);

exports.api = functions.region('europe-west1').https.onRequest(app);
