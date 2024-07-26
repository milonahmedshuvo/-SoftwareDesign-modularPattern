import express from 'express'
import { adminControllars } from './admin.controllar'

const router = express.Router()



router.get('/', adminControllars.getAllAdmins)
router.get('/single/:id', adminControllars.getSingleAdmin)
router.patch('/update/:id', adminControllars.updateSingleAdmin)
router.delete('/delete/:id', adminControllars.deleteSingleAdmin)







export const adminRoutes = router