import mongoose from "mongoose"
import QueryBuilder from "../../builder/queryBuilder"
import { AdminSearchableFields } from "./admin.constant"
import { TAdmin } from "./admin.interface"
import { Admin } from "./admin.model"
import AppError from "../../error/appError"
import { User } from "../user/user.model"



const getAllAdminFromDB = async (query:Record<string, unknown> ) => {

    console.log(query)
    const adminQuery = new QueryBuilder(Admin.find(), query).search(AdminSearchableFields).sort().fields().paginate()

    const result = await adminQuery.modelQuery

    return result;
}


const getSingleAdminFromDB = async ( id:string ) => {

    const result = await Admin.findById({_id: id})
    return result;
}



const updateSingleAdminFromDB = async ( id:string, payload:TAdmin ) => {
      
    const { name, ...remainingUpdateDatas } = payload

    const modifiedUpdateDatas:Record<string, unknown > = { ...remainingUpdateDatas }


    if(name && Object.keys(name).length){
        for( const [key, value] of Object.entries(name)){
            modifiedUpdateDatas[`name.${key}`] = value
        }
    }


    const result = await Admin.findByIdAndUpdate({_id: id}, modifiedUpdateDatas, {new: true, runValidators: true})
    return result;
}






const deleteSingleAdminFromDB = async ( id:string ) => {

    const session = await mongoose.startSession()

    try{
        session.startTransaction()

        const deleteAdmin = await Admin.findByIdAndUpdate(id, {isDeleted: true}, {new:true, session})

        if(!deleteAdmin){
            throw new AppError(400, 'Admin deleted is Failed')
        }

        const userId = deleteAdmin.user

        const deletedUser = await User.findByIdAndUpdate(userId, {isDeleted:true}, {new:true, session})

        if(!deletedUser){
            throw new Error("admin is not deleted")
        }

        await session.commitTransaction()
        await session.endSession()
    }catch(err:any){
     await session.abortTransaction()
     await session.endSession()
     throw new Error(err)
    }

}






export const adminServices = {
    getAllAdminFromDB,
    getSingleAdminFromDB,
    updateSingleAdminFromDB,
    deleteSingleAdminFromDB
}