import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { academicSemesterServices } from "./academicSemester.service"



const createAcademicSemester  = catchAsync(async (req, res, next) => {


   const result = await academicSemesterServices.createAcademicSemesterFromDB(req.body)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic semester create succesfully",
        data: result
    })
    
})




export const AcademicSemesterControllers = {
    createAcademicSemester
}