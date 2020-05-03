import express from 'express';

import cors from '../../middleware/cors';
import quizExists from '../../middleware/quizExists';

import create from './create';

const app = express();
app.use(cors);

app.post('/', quizExists, create);

export default app;
