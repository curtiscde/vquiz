import express from 'express';

import cors from '../../middleware/cors';

import loginUser from './loginUser';

const app = express();
app.use(cors);

app.post('/login', loginUser);

export default app;
