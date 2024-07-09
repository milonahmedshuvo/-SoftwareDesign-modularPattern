import { NextFunction, Request, Response } from "express"
import { userService } from "./user.service"

const createStudent = async ( req:Request, res:Response, next:NextFunction ) => {
    
    try{

      const { password, student:studentData } = req.body

      // data validation from client site by joi 
    //   const {error, value } = studentValidationSchema.validate(studentData)
      // console.log({error}, {value})

      const result = await userService.createStudentIntoDB(password, studentData)

    //   if(error){
    //     res.status(500).json({
    //       success: "false joi",
    //       message: "joi validation filed",
    //       errors:error
    //     })
    //   }

      res.status(200).json({
        success: "true",
        message: "student create succesfully",
        data: result
      })
     

    }catch(err){
        console.log(err)
        // res.status(500).json({
        //   success: "false",
        //   message: err.message || "something went wrong",
        //   error: err
        // })
        next(err)
    }
}


export const userControllers = {
  createStudent
}