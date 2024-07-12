import  express  from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequst from "../../middleware/validateRequst";
import { academicSemestervalidate } from "./academicSemester.validation";


const router = express.Router()


router.post('/create-academic-semester', validateRequst(academicSemestervalidate.creatingAcademicSemesterValidationSchema), AcademicSemesterControllers.createAcademicSemester)
router.get("/single/:semesterId", AcademicSemesterControllers.academicSemesterSingleData )
router.patch("/update-academic-semester/:semesterId", validateRequst(academicSemestervalidate.updateAcademicSemesterValidationSchema),  AcademicSemesterControllers.updateAcademicSemester )
router.get("/all-data", AcademicSemesterControllers.academicSemesterAllData )

export const academicSemesterRoutes = router
