import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import config from './app/config'
import { studentRoutes } from './app/modules/student/student.routes'
import { userRoutes } from './app/modules/user/user.routes'
import { academicSemesterRoutes } from './app/modules/academicSemester/academicSemester.routes'
import { academicFacultyRoutes } from './app/modules/academicFaculty/academicFaculty.routes'
import { academicDepartmentRoutes } from './app/modules/academicDepartment/academicDepartment.routes'
import { ZodError, ZodIssue } from 'zod'
import { TErrorSource } from './app/interfece/error.interfece'
import handaleZodError from './app/error/handleZodError'
import handleMongooseError from './app/error/handleMongooseError'
import handleCastError from './app/error/handleCastError'
import AppError from './app/error/appError'
import { adminRoutes } from './app/modules/Admin/admin.routes'
import { facultyRoutes } from './app/modules/Faculty/faculty.routes'
import { courseRoutes } from './app/modules/Course/course.routes'
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
app.use("/api/v1/academic-department", academicDepartmentRoutes) 

app.use("/api/v1/admin", adminRoutes)
app.use("/api/v1/faculty", facultyRoutes)

//creaking processing....

app.use("/api/v1/courses", courseRoutes)








// global error handalar 
app.use((err:any, req:Request, res:Response, next:NextFunction) => {
    
  let statusCode = err.statusCode || 500
  let message = err.message || "something wrong"
  let errorSource: TErrorSource = [{
    path: '',
    message: 'somthing wrong'
  }]





  if( err instanceof ZodError){
    let simplifiedError = handaleZodError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSource = simplifiedError?.errorSource
  }else if(err.name == 'ValidationError'){
    let simplifiedMongooseError = handleMongooseError(err)
    statusCode = simplifiedMongooseError.statusCode
    message = simplifiedMongooseError.message,
    errorSource = simplifiedMongooseError.errorSource
  }else if(err.name == 'CastError'){
    const simplifiedCastError = handleCastError(err)
    statusCode = simplifiedCastError.statusCode
    message = simplifiedCastError.message
    errorSource = simplifiedCastError.errorSource
  }else if(err instanceof AppError){
    statusCode = err?.statusCode
    message = err.message
    errorSource= [{
      path: "",
      message: err?.message
    }]
  }else if (err instanceof Error ) {
    message = err?.message
    errorSource = [{
      path: "",
      message: err.message
    }]
  }



  res.status(statusCode).json({
    success: "false and globar error!",
    message: message,
    errorSource,
    stack: config.NODE_ENV =='development'? err?.stack : null, 
    // amimongoose : err
    
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