import { NextFunction, Request, RequestHandler, Response, response } from "express";
import { studentService } from "./student.service";
import catchAsync from "../../utils/catchAsync";
// import studentValidationSchema from "./student.validation";




const getAllstudent = catchAsync( async (req, res, next) => {
  
  console.log({"student decoded in requst": req.user})
  
  // try{
    const result = await studentService.getAllstudentFromDB(req.query)
    res.status(200).json({
      success: "true",
      message: "student is get succesfully",
      data: result
    })

  // }catch(err) {
  //   console.log(err)
  //   // res.status(500).json({
  //   //   success: "false",
  //   //   message: err.message || "something went wrong",
  //   //   error: err
  //   // })
  //   next(err)
  // }
  
})











const studentSingleData =async (req: Request, res: Response, next:NextFunction) => {
      try{
        const {id} = req.params
      const result = await studentService.studentSingleData(id)

      res.status(200).json({
        success: "true",
        message: "get student single query succesfully",
        data: result
      })

      }catch(err) {
        // res.status(500).json({
        //   success: "false",
        //   message: err.message || "someting wrong single data",
        //   error: err
        // })
        next(err)
      }
}



const deleteStudent = async (req:Request, res: Response, next:NextFunction) => {
      try{
       const { id } = req.params
       const result = await studentService.deletedStudentFromDB(id)
       res.status(200).json({
        success: "true",
        message: "student succesfully deleted",
        data: result
       })
      }catch(err){
          // res.status(5000).json({
          //   success: "false",
          //   message: error.message || "something wrong",
          //   error: error
          // })
          next(err)
      }
}






const updateStudent = async (req:Request, res: Response, next:NextFunction) => {

    

  try{
   const { id } = req.params;
   const { student } = req.body
   
   const result = await studentService.updateStudentFromDB(id, student)


   res.status(200).json({
    success: "true",
    message: "student succesfully update",
    data: result
   })


  }catch(err){
      // res.status(5000).json({
      //   success: "false",
      //   message: error.message || "something wrong",
      //   error: error
      // })
      next(err)
  }
}


export const studentControllers = {
    // createStudent,
    getAllstudent,
    studentSingleData,
    deleteStudent,
    updateStudent
}