import express from 'express';

import cors from '../../middleware/cors';

const app = express();
app.use(cors);

export default app;
