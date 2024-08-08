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




const changePassword = catchAsync(async(req, res, next) => {
    // console.log({"decoded": req.user, body: req.body })

    const result = await authService.changePasswordIntoDB(req.user, req.body)

     sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Your password is update successfully",
        data: null
     })
})






export const authController = {
    loginUser,
    changePassword
}