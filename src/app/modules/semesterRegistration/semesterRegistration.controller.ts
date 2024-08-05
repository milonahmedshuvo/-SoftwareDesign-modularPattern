import { Request, RequestHandler } from "express"
import { semesterRegistrationServices } from "./semesterRegistration.service"

const createSemesterRegistration: RequestHandler = async (req, res, next) => {
    try {

        const result = await semesterRegistrationServices.createSemesterRegistrationIntoDB(req.body)

        res.status(200).json({
            success: "true",
            message: "Semester Registration is succefully",
            data: result
        })

    } catch (err) {
        next(err)
    }
}




const getAllSemesterRegistration: RequestHandler = async (req, res, next) => {

    try {

        const result = await semesterRegistrationServices.getAllSemesterRegistrationFromDB(req.query)

        res.status(200).json({
            success: true,
            message: "Get all semester registration succefully",
            data: result
        })

    } catch (err) {
        next(err)
    }
}



const getSingleSemesterRegistration: RequestHandler = async (req, res, next) => {

   try{

    const { id } = req.params
    const result = await semesterRegistrationServices.getSingleSemesterRegistrationFromDB(id)

    res.status(200).json({
        success: "true",
        message: "Get single semester Registration",
        data: result
    })

   }catch(err) {
    next(err)
   }

}






const updateSemesterRegistration:RequestHandler = async (req, res, next) => {

    try{
        const { id } = req.params

        const result = await semesterRegistrationServices.updateSemesterRegistrationIntoDB(id, req.body)
        
        res.status(200).json({
            success: true,
            message: "Semester registration update is successfully",
            data: result
        })

    }catch(err) {
        next(err)
    }
}


export const semesterRegistrationControllers = {
    createSemesterRegistration,
    getAllSemesterRegistration,
    getSingleSemesterRegistration,
    updateSemesterRegistration
}