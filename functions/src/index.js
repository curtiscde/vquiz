import express from 'express';
import getAllQuizzes from './APIs/quiz';

const functions = require('firebase-functions');

const app = express();

app.get('/quizzess', getAllQuizzes);

exports.api = functions.region('europe-west1').https.onRequest(app);
