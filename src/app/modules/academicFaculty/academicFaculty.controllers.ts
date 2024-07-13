import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicSemesterServices } from "../academicSemester/academicSemester.service";
import { AcademicFacultyServices } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async(req, res, next) => {
     
      const result = await AcademicFacultyServices.createAcademicFacultyFromDB(req.body)

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Faculty create successfully!",
        data: result
      })
      
})



const getAllAcademicFaculty = catchAsync(async (req, res, next) => {
      
      const result = await AcademicFacultyServices.getAllAcademicFacultyFromDB()
      
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Get all academic faculty successfully",
        data: result
      })
})



const getSingleAcademicFaculty = catchAsync(async (req, res, next) => {
      
  const {facultyId} = req.params
  const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId)


  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get single academic faculty successfully",
    data: result
  })

})



const updateAcademicFaculty = catchAsync(async (req, res, next) => {
      const {facultyId} = req.params
      const result = await AcademicFacultyServices.updateAcademicFacultyFromDB(facultyId, req.body)
      
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic faculty update successfully!",
        data: result
      })
})

export const AcademciFacultyControllers = {
    createAcademicFaculty,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    updateAcademicFaculty
}