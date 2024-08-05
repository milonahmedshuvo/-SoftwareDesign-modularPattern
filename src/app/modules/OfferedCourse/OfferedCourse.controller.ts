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







export const OfferedCourseController = {
    createOfferedCourse
}