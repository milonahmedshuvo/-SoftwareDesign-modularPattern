import express from 'express'
import { facultyControllers } from './faculty.controller'
import validateRequst from '../../middleware/validateRequst'
import { facultyValidations } from './faculty.validation'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()


router.get('/', auth( ), facultyControllers.getAllFaculty)
router.get('/single/:id', facultyControllers.getSingleFaculty)
router.patch('/update/:id', validateRequst(facultyValidations.updateFacultyValidationSchema), facultyControllers.updateSingleFaculty)
router.delete('/delete/:id', facultyControllers.deleteSingleFaculty)




export const facultyRoutes = router
