import express from 'express';

import cors from '../../middleware/cors';
import auth from '../../middleware/auth';
import quizOwner from '../../middleware/quizOwner';

import getQuizzes from './getQuizzes';
import getQuiz from './getQuiz';
import createQuiz from './createQuiz';
import deleteQuiz from './deleteQuiz';
import editQuiz from './editQuiz';

const app = express();
app.use(cors);

app.get('/', auth, getQuizzes);
app.get('/:quizId', auth, quizOwner, getQuiz);
app.post('/', auth, createQuiz);
app.delete('/:quizId', auth, deleteQuiz);
app.put('/:quizId', auth, quizOwner, editQuiz);

export default app;
