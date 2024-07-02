import { Request, Response, response } from "express";
import { studentService } from "./student.service";
import studentValidationSchema from "./student.validation";

const createStudent = async ( req:Request, res:Response ) => {
    
    try{

      const { student:studentData } = req.body

      // data validation from client site by joi 
      const {error, value } = studentValidationSchema.validate(studentData)
      // console.log({error}, {value})
      const result = await studentService.createStudentIntoDB(value)

      if(error){
        res.status(500).json({
          success: "false joi",
          message: "joi validation filed",
          errors:error
        })
      }

      res.status(200).json({
        success: "true",
        message: "student create succesfully",
        data: result
      })

    }catch(err:any){
        console.log(err)
        res.status(500).json({
          success: "false",
          message: err.message || "something went wrong",
          error: err
        })
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