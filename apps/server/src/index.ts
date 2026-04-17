import express, { Request, Response } from 'express';
import cors from 'cors';
import { HealthStatus } from '../../../packages/shared';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    const response: HealthStatus = {
        status: 'ok',
        time: new Date().toISOString(),
        version: '1.0.0'
    };
    res.json(response);
});

app.listen(3000, () => console.log('🚀 Server at http://localhost:3000'));