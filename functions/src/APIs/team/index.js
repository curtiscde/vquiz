import express from 'express';

import cors from '../../middleware/cors';
import auth from '../../middleware/auth';
import quizExists from '../../middleware/quizExists';
import quizOwner from '../../middleware/quizOwner';

import getTeams from './getTeams';
import createTeam from './createTeam';
import deleteTeam from './deleteTeam';
import uploadImage from './uploadImage';
import removeImage from './removeImage';

const app = express();
app.use(cors);

app.get('/:quizId', auth, getTeams);
app.post('/', quizExists, createTeam);
app.delete('/', auth, quizOwner, deleteTeam);
app.post('/image/:quizId/:teamId', quizExists, uploadImage);
app.delete('/image', quizExists, removeImage);

export default app;
