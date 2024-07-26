import mongoose from "mongoose"
import QueryBuilder from "../../builder/queryBuilder"
import { FacultySearchableFields } from "./faculty.constant"
import { TFaculty } from "./faculty.interfece"
import { Faculty } from "./faculty.model"
import { User } from "../user/user.model"
import AppError from "../../error/appError"

const getAllFacultyFromDB = async (query: Record<string, unknown>) => {

      const facultyQuery = new QueryBuilder(Faculty.find(), query).search(FacultySearchableFields).sort().paginate().fields()

      const result = await facultyQuery.modelQuery
      return result
}




const getSingleFacultyFromDB = async (id:string) => {

   const result = await Faculty.findById(id)
    return result
}


const updateSingleFacultyFromDB = async (id:string, payload:TFaculty) => {

    const {name, ...remainigUpdateData } = payload

    const modifiedUpdateData:Record<string, unknown > = { ...remainigUpdateData }


    if(name && Object.keys(name).length){
        for(const [key, value] of Object.entries(name)){
            modifiedUpdateData[`name.${key}`] = value
        }
    }

    const result = await Faculty.findByIdAndUpdate(id, modifiedUpdateData, {new:true, runValidators: true} )
     return result
 }



 const deletSingleFacultyFromDB = async (id:string) => {
      const session = await mongoose.startSession()

      try{
        session.startTransaction()
        const deleteFaculty = await Faculty.findByIdAndUpdate(id, {isDeleted: true}, {new: true, session})

        if(!deleteFaculty){
            throw new Error("Faculty is not Deleted")
        }

        // get user id from faculty because i will delete user 
       const userId =  deleteFaculty.user

       const deleteUser = await User.findByIdAndUpdate(userId, {isDeleted: true}, {new: true, session})

       if(!deleteUser){
        throw new AppError(400, "User is not Deleted")
       }



       await session.commitTransaction()
       await session.endSession()

       return deleteFaculty

      }catch(err: any){
        session.abortTransaction()
        session.endSession()
        throw new Error(err)
      }

 }
 




export const facultyService = {
    getAllFacultyFromDB,
    getSingleFacultyFromDB,
    updateSingleFacultyFromDB,
    deletSingleFacultyFromDB
 }