import express from 'express';

import cors from '../../middleware/cors';
import quizExists from '../../middleware/quizExists';

import createTeam from './createTeam';
import uploadImage from './uploadImage';
import removeImage from './removeImage';

const app = express();
app.use(cors);

app.post('/', quizExists, createTeam);
app.post('/image/:quizId/:teamId', quizExists, uploadImage);
app.delete('/image', quizExists, removeImage);

export default app;
