import express from 'express';
import cors from '../../middleware/cors';
import quizExists from '../../middleware/quizExists';
import { createTeam } from './createTeam';

const app = express();
app.use(cors);

app.post('/', quizExists, createTeam);

export default app;
