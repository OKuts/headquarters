import express from 'express'
import cors from 'cors'
import {getEnv} from './utils/getEnv'
import {
    departmentCreateServerApi,
    departmentsGetServerApi,
    isAdminControlApi,
    loginUserServerApi,
    registerUserServerApi,
    taskAddServerApi,
    tasksGetServerApi
} from './api'
import 'dotenv/config'

const app = express()
app.use(cors())
app.use(express.json())



app.get('/api/tasks/get', tasksGetServerApi)
app.get('/api/departments/get', departmentsGetServerApi)

app.post('/api/auth/verify-admin', isAdminControlApi)
app.post('/api/task/add', taskAddServerApi)
app.post('/api/user/add', registerUserServerApi)
app.post('/api/user/login', loginUserServerApi)
app.post('/api/department/create', departmentCreateServerApi)


app.listen(3001, () => {
    console.log('process ==>', getEnv())
    console.log('🚀 Server at http://localhost:3001')
})