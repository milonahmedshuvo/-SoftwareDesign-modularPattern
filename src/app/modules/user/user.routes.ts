import express, { NextFunction, Request, Response } from 'express'
import { userControllers } from './user.controller'
import { studentValidations } from '../student/student.zod.validation'
import validateRequst from '../../middleware/validateRequst'


const router = express.Router()




router.post("/create-student", validateRequst(studentValidations.studentZodValidationSchema), userControllers.createStudent)





export const userRoutes = router