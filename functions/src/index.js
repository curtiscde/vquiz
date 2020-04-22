import express from 'express';
import { getAllQuizzes, getQuiz, createQuiz } from './APIs/quiz';

const functions = require('firebase-functions');

const app = express();

app.get('/quizzes', getAllQuizzes);
app.get('/quiz/:quizId', getQuiz);
app.post('/quiz', createQuiz);

exports.api = functions.region('europe-west1').https.onRequest(app);
