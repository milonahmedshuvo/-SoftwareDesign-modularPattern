import express, { NextFunction, Request, Response } from 'express'
import { userControllers } from './user.controller'
import { studentValidations } from '../student/student.zod.validation'
import validateRequst from '../../middleware/validateRequst'
import {facultyValidations } from '../Faculty/faculty.validation'
import { AdminValidations } from '../Admin/admin.validation'


const router = express.Router()




router.post("/create-student", validateRequst(studentValidations.studentZodValidationSchema), userControllers.createStudent)

router.post('/create-faculty', validateRequst(facultyValidations.createFacultyValidationSchema), userControllers.createFaculty)

router.post('/create-admin', validateRequst(AdminValidations.createAdminValidationSchema), userControllers.createAdmin)




export const userRoutes = router