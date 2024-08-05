import  express  from "express";
import { OfferedCourseController } from "./OfferedCourse.controller";
import validateRequst from "../../middleware/validateRequst";
import { offeredCourseValidation } from "./OfferedCourse.validation";

const router = express.Router()


router.post('/create',validateRequst(offeredCourseValidation.createOfferedCourseValidationSchema),OfferedCourseController.createOfferedCourse)






export const OfferedCourseRoutes = router