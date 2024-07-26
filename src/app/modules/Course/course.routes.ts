import express from 'express'
import validateRequst from '../../middleware/validateRequst'
import { courseValidation } from './course.validation'
import { courseControllers } from './course.controller'

const router = express.Router()


router.post('/create', validateRequst(courseValidation.createCourseValidationSchema), courseControllers.createCourse),
router.get('/all', courseControllers.getAllCourses)
router.get('/single/:id', courseControllers.getSingleCourse)
router.delete('/delete/:id', courseControllers.deleteCourse)





export const courseRoutes = router