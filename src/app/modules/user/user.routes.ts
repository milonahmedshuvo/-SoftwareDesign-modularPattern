import express, { NextFunction, Request, Response } from 'express'
import { userControllers } from './user.controller'
import { AnyZodObject } from 'zod'
import { studentValidations } from '../student/student.zod.validation'


const router = express.Router()





const senabahini = (schema:AnyZodObject) => {

    return async (req:Request, res:Response, next:NextFunction) => {
        console.log(req.body)
        // req.body.password,
        // req.body.student,
        
       try{
         // zod data validation 
         await schema.parseAsync({
            body: req.body
        })
         next()
         
       }catch(err){
        next(err)
       }


       
    }
}






router.post("/create-student", senabahini(studentValidations.studentZodValidationSchema), userControllers.createStudent)





export const userRoutes = router