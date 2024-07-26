import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { facultyService } from "./faculty.service";



const getAllFaculty = catchAsync(async (req, res, next ) => {
 
    const result = await facultyService.getAllFacultyFromDB(req.query)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "get all faculty successfully",
        data: result
    })

})


const getSingleFaculty = catchAsync(async (req, res, next ) => {
      const {id} = req.params

      const result = await facultyService.getSingleFacultyFromDB(id)
    
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Faculty single succesfully',
        data: result
      })
})


const updateSingleFaculty = catchAsync(async (req, res, next ) => {
 
      const {id} = req.params
      const {faculty} = req.body


      const result = await facultyService.updateSingleFacultyFromDB(id, faculty)

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Faculty is update successfully',
        data: result
      })
    
})


const deleteSingleFaculty = catchAsync(async (req, res, next ) => {
 
      const {id } = req.params

      const result = await facultyService.deletSingleFacultyFromDB(id)

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Faculty is delete succesfully',
        data: result
      })
    
})



export const facultyControllers = {
    getAllFaculty,
    getSingleFaculty,
    updateSingleFaculty,
    deleteSingleFaculty
}