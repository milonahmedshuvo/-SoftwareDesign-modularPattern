import  express  from "express";
import { studentControllers } from "./student.controllers";

const router = express.Router()

router.post("/create-student", studentControllers.createStudent)
router.get("/", studentControllers.getAllstudent)
router.get("/:studentId", studentControllers.studentSingleData)


export const studentRoutes = router
