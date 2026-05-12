import express from 'express'
import cors from 'cors'

import {taskAddServerApi, tasksGetServerApi} from './api/tasks'
import {isAdminControlApi, loginUserServerApi, registerUserServerApi} from './api/users'
import {
    departmentDataServerApi,
    departmentDeleteServerApi,
    departmentsGetServerApi,
    departmentsPatchServerApi
} from './api/departments'
import {getEnv} from './utils/getEnv'
import 'dotenv/config'

const app = express()
app.use(cors())
app.use(express.json())


// departments
app.get('/api/departments', departmentsGetServerApi)
app.post('/api/departments', departmentDataServerApi)
app.delete('/api/departments', departmentDeleteServerApi)
app.patch('/api/departments', departmentsPatchServerApi)

// tasks
app.get('/api/tasks/get', tasksGetServerApi)
app.post('/api/task/add', taskAddServerApi)

// users
app.post('/api/auth/verify-admin', isAdminControlApi)
app.post('/api/user/add', registerUserServerApi)
app.post('/api/user/login', loginUserServerApi)


app.listen(3001, () => {
    console.log('process ==>', getEnv())
    console.log('🚀 Server at http://localhost:3001')
})