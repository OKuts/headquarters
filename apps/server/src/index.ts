import express from 'express';
import cors from 'cors';
import {getEnv} from "./utils/getEnv";
import {taskAddApi} from './api/taskAddApi'

const app = express();
app.use(cors());
app.use(express.json());

// app.get('/api/tasks', taskAddApi)


app.post('/api/task/add', taskAddApi);


app.listen(3000, () => {
    console.log('process', getEnv())
    console.log('🚀 Server at http://localhost:3000')
});