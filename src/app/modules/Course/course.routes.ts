import express from 'express'
import validateRequst from '../../middleware/validateRequst'
import { courseValidation } from './course.validation'
import { courseControllers } from './course.controller'
import { valid } from 'joi'

const router = express.Router()


router.post('/create', validateRequst(courseValidation.createCourseValidationSchema), courseControllers.createCourse),
router.get('/all', courseControllers.getAllCourses)
router.get('/single/:id', courseControllers.getSingleCourse)
router.delete('/delete/:id', courseControllers.deleteCourse)
router.patch('/update/:id', validateRequst(courseValidation.updateCourseValidationSchema),  courseControllers.updateCourse)

router.put('/:courseId/assign-faculty', validateRequst(courseValidation.assignFacultyWithCourseSchema), courseControllers.assignFacultyWithCourse)

router.delete('/:courseId/remove-faculty', validateRequst(courseValidation.removeFacultyWithCourseSchema), courseControllers.removeFacultyWithCourse)





export const courseRoutes = router