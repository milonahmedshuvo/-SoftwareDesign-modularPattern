import { NextFunction, Request, Response } from "express";
import { adminServices } from "./admin.service";

const getAllAdmins = async (req:Request, res:Response, next:NextFunction) => {
     
     const result= await adminServices.getAllAdminFromDB(req.query)

     res.status(200).json({
        success: "true",
        message: "get all admin datas",
        data: result
     })
}


const getSingleAdmin = async (req:Request, res:Response, next:NextFunction) => {
     
    const {id} = req.params

    const result= await adminServices.getSingleAdminFromDB(id)

    res.status(200).json({
       success: "true",
       message: "get single admin datas",
       data: result
    })
}




const updateSingleAdmin = async (req:Request, res:Response, next:NextFunction) => {
     
    const {id} = req.params
    const {admin} = req.body

    const result= await adminServices.updateSingleAdminFromDB(id, admin )

    res.status(200).json({
       success: "true",
       message: "update succesfully admin",
       data: result
    })
}





const deleteSingleAdmin = async (req:Request, res:Response, next:NextFunction) => {
     
    const {id} = req.params
   
    const result= await adminServices.deleteSingleAdminFromDB(id)

    res.status(200).json({
       success: "true",
       message: "Delete succesfully admin",
       data: result
    })
}


export const adminControllars = {
    getAllAdmins,
    getSingleAdmin,
    updateSingleAdmin,
    deleteSingleAdmin
}