import express from 'express'
import cors from 'cors'

import {taskAddServerApi, tasksGetServerApi} from './api/tasks'
import {isAdminControlApi, userServerApi, usersGetServerApi} from './api/users'
import {
    departmentDataServerApi,
    departmentDeleteServerApi,
    departmentsGetServerApi,
    departmentsPatchServerApi
} from './api/departments'
import {getEnv} from './utils/getEnv'
import 'dotenv/config'
import {adminsGetServerApi} from './api/admin/adminsGetServerApi'
import {personalAddServerApi, personalGetServerApi, personalPatchServerApi} from './api/personal'

const app = express()
app.use(cors())
app.use(express.json())


// departments
app.get('/api/admins', adminsGetServerApi)
app.post('/api/admin', isAdminControlApi)

app.get('/api/departments', departmentsGetServerApi)
app.post('/api/departments', departmentDataServerApi)
app.delete('/api/departments', departmentDeleteServerApi)
app.patch('/api/departments', departmentsPatchServerApi)

// tasks
app.get('/api/tasks/get', tasksGetServerApi)
app.post('/api/task/add', taskAddServerApi)

// users

app.get('/api/user', usersGetServerApi)
app.post('/api/user', userServerApi)

// personal
app.get('/api/personal', personalGetServerApi)
app.post('/api/personal', personalAddServerApi)
app.patch('/api/personal', personalPatchServerApi)


app.listen(3001, () => {
    console.log('process ==>', getEnv())
    console.log('🚀 Server at http://localhost:3001')
})