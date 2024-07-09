import  express  from "express";
import { studentControllers } from "./student.controllers";

const router = express.Router()

// router.post("/create-student", studentControllers.createStudent)
router.get("/", studentControllers.getAllstudent)
router.get("/:studentId", studentControllers.studentSingleData)
router.delete("/:userId", studentControllers.deleteStudent)


export const studentRoutes = router
