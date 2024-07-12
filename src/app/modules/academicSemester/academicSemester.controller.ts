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




const academicSemesterSingleData = catchAsync(async (req, res, next) => {
      const { semesterId } = req.params
      const result = await academicSemesterServices.academicSemesterSingleDataFromDB(semesterId)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic semester single data succesfully",
        data : result
    })

})




const updateAcademicSemester = catchAsync(async (req, res, next) => {
     const {semesterId} = req.params
     const result = await academicSemesterServices.updateAcademicSemesterFromDB(semesterId, req.body)
     
     sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic semester update succesfully",
        data: result
     })
})


const academicSemesterAllData = catchAsync(async(req, res, next) => {

    const result = await academicSemesterServices.academicSemesterAllDataFromDB()

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic semester all data get succesfully",
        data: result
    })
})

export const AcademicSemesterControllers = {
    createAcademicSemester,
    academicSemesterSingleData,
    updateAcademicSemester,
    academicSemesterAllData
}
