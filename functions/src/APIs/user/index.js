import express from 'express';

import cors from '../../middleware/cors';
import auth from '../../middleware/auth';

import getUser from './getUser';

const app = express();
app.use(cors);

app.get('/', auth, getUser);

export default app;
