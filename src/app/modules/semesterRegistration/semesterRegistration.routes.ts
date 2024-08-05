import express from 'express'
import { semesterRegistrationControllers } from './semesterRegistration.controller'
import validateRequst from '../../middleware/validateRequst'
import { semesterRegistrationValidations } from './semesterRegistration.validation'

const router = express.Router()


router.post('/create',validateRequst(semesterRegistrationValidations.createSemesterRegistrationValidationSchema), semesterRegistrationControllers.createSemesterRegistration )

router.get('/all', semesterRegistrationControllers.getAllSemesterRegistration)
router.get('/single/:id', semesterRegistrationControllers.getSingleSemesterRegistration)
router.patch('/update/:id', validateRequst(semesterRegistrationValidations.updateSemesterRegistrationValidationSchema), semesterRegistrationControllers.updateSemesterRegistration)


export const semesterRegistrationRoutes = router