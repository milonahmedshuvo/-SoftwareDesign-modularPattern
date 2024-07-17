import { NextFunction, Request, Response } from "express"
import { userService } from "./user.service"
import sendResponse from "../../utils/sendResponse"
import catchAsync from "../../utils/catchAsync"







const createStudent = async ( req:Request, res:Response, next:NextFunction ) => {
    
    try{

      const { password, student:studentData } = req.body

      // data validation from client site by joi 
      // const {error, value } = studentValidationSchema.validate(studentData)
      // console.log({error}, {value})

      // zod data validation 
      // const zodDataValidate =  studentZodValidationSchema.parse(studentData)

      const result = await userService.createStudentIntoDB(password, studentData)


    //   if(error){
    //     res.status(500).json({
    //       success: "false joi",
    //       message: "joi validation filed",
    //       errors:error
    //     })
    //   }




      // res.status(200).json({
      //   success: "true",
      //   message: "student create succesfully",
      //   data: result
      // })

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "student created succesfully",
        data: result
      } )
     


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





const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  

  const result = await userService.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  });
});



// admin 




export const userControllers = {
  createStudent,
  createFaculty,
}
