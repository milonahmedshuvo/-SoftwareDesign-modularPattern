import  express  from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequst from "../../middleware/validateRequst";
import { academicSemestervalidate } from "./academicSemester.validation";


const router = express.Router()


router.post('/create-academic-semester', validateRequst(academicSemestervalidate.creatingAcademicSemesterValidationSchema), AcademicSemesterControllers.createAcademicSemester)




export const academicSemesterRoutes = router