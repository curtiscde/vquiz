import express from 'express';

import cors from '../../middleware/cors';
import quizExists from '../../middleware/quizExists';

import createRound from './createRound';

const app = express();
app.use(cors);

app.post('/', quizExists, createRound);

export default app;
