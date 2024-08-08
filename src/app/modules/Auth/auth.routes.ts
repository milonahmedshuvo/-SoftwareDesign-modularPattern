import express from 'express'
import { authController } from './auth.controller'
import validateRequst from '../../middleware/validateRequst'
import { AuthValidation } from './auth.validation'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()



router.post('/login', validateRequst(AuthValidation.loginUserValidationSchema), authController.loginUser )
router.post('/change-password', auth(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.admin), validateRequst(AuthValidation.changePasswordValidationSchema), authController.changePassword )




export const AuthRoutes = router