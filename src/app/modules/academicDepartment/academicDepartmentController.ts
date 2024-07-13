import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { academicDepartmentService } from "./academicDepartment.service"

const createAcademicDepartment = catchAsync(async(req, res, next) => {

    const result = await academicDepartmentService.creatingAcademicDepartmentFromDB(req.body)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academci department is create succesfully",
        data: result
    })

})


const getAllAcademicDepartment = catchAsync(async(req, res, next) => {

    const result = await academicDepartmentService.getAllAcademicDepartmentFromDB()

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic department get all succesfully",
        data: result
    })

})



const getSingleAcademicDepartment = catchAsync(async(req, res, next) => {
         const {departmentId} = req.params


    const result = await academicDepartmentService.getSingleAcademicDepartmentDB(departmentId)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic department single succesfully",
        data: result
    })

})





const updateAcademicDepartment  = catchAsync(async(req, res, next) => {
    const {departmentId} = req.params


const result = await academicDepartmentService.updateAcademicDepartmentDB(departmentId, req.body)

sendResponse(res, {
   statusCode: 200,
   success: true,
   message: "Academic department update succesfully",
   data: result
})

})


export const academicDepartmentControllers = {
    createAcademicDepartment,
    getAllAcademicDepartment,
    getSingleAcademicDepartment,
    updateAcademicDepartment
}