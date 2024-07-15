import express from 'express'
import { academicDepartmentControllers } from './academicDepartmentController'
import { academicDepartmentValidations } from './academicDepartment.validation'
import validateRequst from '../../middleware/validateRequst'

const router = express.Router()



// router.post('/create', validateRequst(academicDepartmentValidations.creatingAcademicDepartmentValidationSchema) ,academicDepartmentControllers.createAcademicDepartment)
router.get('/all', academicDepartmentControllers.getAllAcademicDepartment)
router.get('/single/:departmentId', academicDepartmentControllers.getSingleAcademicDepartment)
router.patch('/update/:departmentId', validateRequst(academicDepartmentValidations.updateAcademicDepartmentValidationSchema), academicDepartmentControllers.updateAcademicDepartment)



router.post('/create', academicDepartmentControllers.createAcademicDepartment)

export const academicDepartmentRoutes = router