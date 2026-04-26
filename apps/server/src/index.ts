import express from 'express'
import cors from 'cors'
import {getEnv} from './utils/getEnv'
import {loginUserApi, registerUserApi, taskAddApi, tasksGetApi} from './api'
import 'dotenv/config'
import {departmentsGetApi} from './api/departmentsGetApi'

const app = express()
app.use(cors())
app.use(express.json())


app.get('/api/tasks/get', tasksGetApi)
app.get('/api/tasks/get', tasksGetApi)
app.get('/api/departments/get', departmentsGetApi)

app.post('/api/task/add', taskAddApi)
app.post('/api/user/add', registerUserApi)
app.post('/api/user/login', loginUserApi)


app.listen(3001, () => {
    console.log('process ==>', getEnv())
    console.log('🚀 Server at http://localhost:3001')
})