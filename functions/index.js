const functions = require('firebase-functions');
const app = require('express')();

const { getAllQuizzes } = require('./APIs/quizzes');

app.get('/quizzes', getAllQuizzes);

exports.api = functions.region('europe-west1').https.onRequest(app);