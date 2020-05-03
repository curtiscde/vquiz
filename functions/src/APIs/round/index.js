import express from 'express';

import cors from '../../middleware/cors';
import auth from '../../middleware/auth';
import quizExists from '../../middleware/quizExists';
import quizOwner from '../../middleware/quizOwner';

import createRound from './createRound';
import deleteRound from './deleteRound';
import editRound from './editRound';

const app = express();
app.use(cors);

app.post('/', auth, quizExists, createRound);
app.delete('/', auth, quizOwner, deleteRound);
app.put('/', auth, quizOwner, editRound);

export default app;
