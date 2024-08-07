import express from 'express'
import { authController } from './auth.controller'
import validateRequst from '../../middleware/validateRequst'
import { AuthValidation } from './auth.validation'

const router = express.Router()



router.post('/login', validateRequst(AuthValidation.loginUserValidationSchema), authController.loginUser )




export const AuthRoutes = router