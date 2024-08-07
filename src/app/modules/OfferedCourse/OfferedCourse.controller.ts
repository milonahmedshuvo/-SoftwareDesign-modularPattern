import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OfferedCourseService } from "./OfferedCourse.service";

const createOfferedCourse = catchAsync(async(req, res, next) => {

    const result = await OfferedCourseService.createOfferedCourseIntoDB(req.body)


    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Offered course is succesfully",
        data: result
    })
})


const getAllOfferedCourse = catchAsync(async(req, res, next) => {

    const result = await OfferedCourseService.getAllOfferedCourseFromDB(req.query)


    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Get all Offered course is succesfully",
        data: result
    })
})




const getSingleOfferedCourse = catchAsync(async(req, res, next) => {
     const {id} = req.params
     
    const result = await OfferedCourseService.getSingleOfferedCourseFromDB(id)


    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Get single Offered course is succesfully",
        data: result
    })
})





const updateSingleOfferedCourse = catchAsync(async(req, res, next) => {
    const {id} = req.params
    
   const result = await OfferedCourseService.updateSingleOfferedCourseIntoDB(id, req.body)


   sendResponse(res, {
       statusCode: 200,
       success: true,
       message: "Update Offered course is succesfully",
       data: result
   })
})


const deleteSingleOfferedCourse = catchAsync(async(req, res, next) => {
    const {id} = req.params
    
   const result = await OfferedCourseService.deleteOfferedCourseFromDB(id)


   sendResponse(res, {
       statusCode: 200,
       success: true,
       message: "Delete Offered course is succesfully",
       data: result
   })
})





export const OfferedCourseController = {
    createOfferedCourse,
    getAllOfferedCourse,
    getSingleOfferedCourse,
    updateSingleOfferedCourse,
    deleteSingleOfferedCourse 
}