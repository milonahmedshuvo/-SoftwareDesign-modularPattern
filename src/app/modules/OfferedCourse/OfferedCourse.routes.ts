import  express  from "express";
import { OfferedCourseController } from "./OfferedCourse.controller";
import validateRequst from "../../middleware/validateRequst";
import { offeredCourseValidation } from "./OfferedCourse.validation";

const router = express.Router()


router.post('/create',validateRequst(offeredCourseValidation.createOfferedCourseValidationSchema),OfferedCourseController.createOfferedCourse)
router.get('/all', OfferedCourseController.getAllOfferedCourse)
router.get('/single/:id', OfferedCourseController.getSingleOfferedCourse)
router.patch('/update/:id', validateRequst(offeredCourseValidation.updateOfferedCourseValidationSchema), OfferedCourseController.updateSingleOfferedCourse)
router.delete('/delete/:id', OfferedCourseController.deleteSingleOfferedCourse)



export const OfferedCourseRoutes = router