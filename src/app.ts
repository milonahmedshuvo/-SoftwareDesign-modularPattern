import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import config from './app/config'
import { studentRoutes } from './app/modules/student/student.routes'
import { userRoutes } from './app/modules/user/user.routes'
import { academicSemesterRoutes } from './app/modules/academicSemester/academicSemester.routes'
import { academicFacultyRoutes } from './app/modules/academicFaculty/academicFaculty.routes'
const app = express()
const port = 3000

// parsers 
app.use(express.json())
app.use(cors())


// application routes.............
// api/v1/students/create-student 

app.use("/api/v1/students", studentRoutes) 
app.use("/api/v1/users", userRoutes)  
app.use("/api/v1/academic-semester", academicSemesterRoutes) 
app.use("/api/v1/academic-faculty", academicFacultyRoutes) 






// global error handalar 
app.use((err:any, req:Request, res:Response, next:NextFunction) => {
    
  const statusCode = 500
  const message = err.message || "something wrong"


  res.status(statusCode).json({
    success: "false and ata globar thke asse",
    message: message,
    error: err
  })
})



// not found middleware 
app.use( (req:Request, res:Response, next:NextFunction) => {

  res.status(400).json({
    success: 'false',
    message: "not found page it",
    error: ""
  })
})







app.get('/', (req, res) => {
  res.send('Hello World! mongoose server...')
})

// console.log('app is run')

export default app 