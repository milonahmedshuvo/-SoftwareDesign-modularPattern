import express from 'express'
import { AcademciFacultyControllers } from './academicFaculty.controllers'
import validateRequst from '../../middleware/validateRequst';
import { academicFacultyValidation } from './academicFaculty.validation';

const router = express.Router()


router.post("/create", validateRequst(academicFacultyValidation.createAcademicFacultyValidationSchema), AcademciFacultyControllers.createAcademicFaculty)
router.get("/all-academic-faculty", AcademciFacultyControllers.getAllAcademicFaculty)
router.get("/single/:facultyId", AcademciFacultyControllers.getSingleAcademicFaculty)
router.patch("/update/:facultyId", validateRequst(academicFacultyValidation.updateAcademicFacultyValidationSchema), AcademciFacultyControllers.updateAcademicFaculty)




export const academicFacultyRoutes = router;
