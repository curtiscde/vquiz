import express from 'express';
import firebase from 'firebase';
import config from './util/config';
import { signUpUser, getUser } from './APIs/userAPI';
import userApp from './APIs/user';
import quizApp from './APIs/quiz';
import roundApp from './APIs/round';
import teamApp from './APIs/team';
import scoreApp from './APIs/score';

import cors from './middleware/cors';
import auth from './middleware/auth';

const functions = require('firebase-functions');

const app = express();

firebase.initializeApp(config.firebase);

app.use(cors);

app.post('/signup', signUpUser);
app.get('/user', auth, getUser);

exports.api = functions.region('europe-west1').https.onRequest(app);
exports.user = functions.region('europe-west1').https.onRequest(userApp);
exports.quiz = functions.region('europe-west1').https.onRequest(quizApp);
exports.round = functions.region('europe-west1').https.onRequest(roundApp);
exports.team = functions.region('europe-west1').https.onRequest(teamApp);
exports.score = functions.region('europe-west1').https.onRequest(scoreApp);
