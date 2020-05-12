import express from 'express';

import cors from '../../middleware/cors';
import auth from '../../middleware/auth';

import submitScore from './submitScore';

const app = express();
app.use(cors);

app.post('/', auth, submitScore);

export default app;
