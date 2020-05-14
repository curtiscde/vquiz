import express from 'express';

import cors from '../../middleware/cors';

import loginUser from './loginUser';
import signupUser from './signupUser';

const app = express();
app.use(cors);

app.post('/login', loginUser);
app.post('/signup', signupUser);

export default app;
