import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";


const loginUser = catchAsync(async(req, res, next) => {
     
    const result = await authService.userLoginIntoDB(req.body)


    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User login is succesfully',
        data: result 
    })
})




export const authController = {
    loginUser
}