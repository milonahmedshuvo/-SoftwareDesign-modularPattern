import  express  from "express";
import { studentControllers } from "./student.controllers";
import validateRequst from "../../middleware/validateRequst";
import { studentValidations } from "./student.zod.validation";

const router = express.Router()

// router.post("/create-student", studentControllers.createStudent)
router.get("/", studentControllers.getAllstudent)
router.get("/:studentId", studentControllers.studentSingleData)
router.delete("/:studentId", studentControllers.deleteStudent)
router.patch('/:studentId', validateRequst(studentValidations.updateStudentZodValidationSchema),studentControllers.updateStudent )

export const studentRoutes = router
