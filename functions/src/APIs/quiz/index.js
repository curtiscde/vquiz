import express from 'express';

import cors from '../../middleware/cors';
import auth from '../../middleware/auth';
import quizExists from '../../middleware/quizExists';
import quizOwner from '../../middleware/quizOwner';

import getQuizzes from './getQuizzes';

const app = express();
app.use(cors);

app.get('/', auth, getQuizzes);

export default app;
