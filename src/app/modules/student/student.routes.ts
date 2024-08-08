import  express  from "express";
import { studentControllers } from "./student.controllers";
import validateRequst from "../../middleware/validateRequst";
import { studentValidations } from "./student.zod.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router()

// router.post("/create-student", studentControllers.createStudent)
router.get("/", auth(USER_ROLE.student), studentControllers.getAllstudent)
router.get("/:id", studentControllers.studentSingleData)
router.delete("/:id", studentControllers.deleteStudent)
router.patch('/:id', validateRequst(studentValidations.updateStudentZodValidationSchema),studentControllers.updateStudent )



export const studentRoutes = router
