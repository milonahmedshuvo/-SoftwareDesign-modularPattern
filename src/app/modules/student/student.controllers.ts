import { Request, Response, response } from "express";
import { studentService } from "./student.service";

const createStudent = async ( req:Request, res:Response ) => {
    
    try{

      const { student:studentData } = req.body
      const result = await studentService.createStudentIntoDB(studentData)
      res.status(200).json({
        success: "true",
        message: "student create succesfully",
        data: result
      })

    }catch(err){
        console.log(err)
    }
}



const getAllstudent = async (req: Request, res:Response) => {

      try{
        const result = await studentService.getAllstudentFromDB()
        res.status(200).json({
          success: "true",
          message: "student is get succesfully",
          data: result
        })

      }catch(err) {
        console.log(err)
      }
}



const studentSingleData =async (req: Request, res: Response) => {
      try{
        const {studentId} = req.params
      const result = await studentService.studentSingleData(studentId)
      res.status(200).json({
        success: "true",
        message: "get student single query succesfully",
        data: result
      })

      }catch(err){
        console.log(err)
      }
}


export const studentControllers = {
    createStudent,
    getAllstudent,
    studentSingleData
}