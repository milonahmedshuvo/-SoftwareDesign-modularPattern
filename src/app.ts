import express from 'express'
import cors from 'cors'
import config from './app/config'
import { studentRoutes } from './app/modules/student/student.routes'
import { userRoutes } from './app/modules/user/user.routes'
const app = express()
const port = 3000

// parsers 
app.use(express.json())
app.use(cors())


// application routes.............
// api/v1/students/create-student 

app.use("/api/v1/students", studentRoutes) 
app.use("/api/v1/users", userRoutes) 








app.get('/', (req, res) => {
  res.send('Hello World! mongoose server...')
})

// console.log('app is run')

export default app 