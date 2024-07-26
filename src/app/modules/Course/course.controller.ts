import { NextFunction } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseServices } from "./course.service";

const createCourse = catchAsync(async(req, res, next) => {

    const result = await courseServices.createCourseIntoDB(req.body)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Course is create successfully",
        data: result
    })
})





const getAllCourses = catchAsync( async(req, res, next) => {

    const result = await courseServices.getAllCourseFromDB(req.query)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Get all course is successfully',
        data: result
    })
})





const getSingleCourse = catchAsync(async(req, res, next) => {
     
    const {id} = req.params
    const result = await courseServices.getSingleCourseFromDB(id)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Course single is succesfully",
        data: result
    })
})



const deleteCourse = catchAsync(async(req, res, next) => {
     const {id} = req.params
     const result = await courseServices.deleteCourseFromDB(id)

     sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Course is delete successfully",
        data: result
     })
})




export const courseControllers = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    deleteCourse
}