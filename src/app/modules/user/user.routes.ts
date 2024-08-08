import express, { NextFunction, Request, Response } from 'express'
import { userControllers } from './user.controller'
import { studentValidations } from '../student/student.zod.validation'
import validateRequst from '../../middleware/validateRequst'
import {facultyValidations } from '../Faculty/faculty.validation'
import { AdminValidations } from '../Admin/admin.validation'
import auth from '../../middleware/auth'
import { USER_ROLE } from './user.constant'


const router = express.Router()



// auth(USER_ROLE.admin)

router.post("/create-student",  validateRequst(studentValidations.studentZodValidationSchema), userControllers.createStudent)

router.post('/create-faculty', validateRequst(facultyValidations.createFacultyValidationSchema), userControllers.createFaculty)

router.post('/create-admin', validateRequst(AdminValidations.createAdminValidationSchema), userControllers.createAdmin)




export const userRoutes = router