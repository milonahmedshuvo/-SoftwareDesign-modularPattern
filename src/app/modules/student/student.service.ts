import mongoose from "mongoose";
import { Student } from "./student.model";
import AppError from "../../error/appError";
import { User } from "../user/user.model";
import { TStudent } from "./student.iterface";





const getAllstudentFromDB = async () => {
    const result = await Student.find().populate('admissionSemester').populate({
        path: 'admissionDepartment',
        populate: "academicFaculty"
    })
    return result
}

const studentSingleData = async (id: string ) => {
    const result = Student.findOne({id: id})
    return result
}


const deletedStudentFromDB = async (id: string) => {

      const session = await mongoose.startSession()


      try{
        session.startTransaction()

        const studentDeleted = await Student.findOneAndUpdate(
            {id: id}, 
            {isDeleted: true},
            {new: true, session}
        )

        if(!studentDeleted){
           throw new AppError(400, 'Filed delete student')
        }




        const userDeleted = await User.findOneAndUpdate( 
            {id:id},
            {isDeleted: true},
            {new: true, session}
        )

        if(!userDeleted){
            throw new AppError(400, 'Filed deleted user')
        }

        await session.commitTransaction()
        await session.endSession()

        return  studentDeleted

      }catch(err){
            await session.abortTransaction()
            await session.endSession()
      }
      
}



const updateStudentFromDB = async (id: string, payload:Partial<TStudent>) => {

    const {name,guardian, localGuardian, ...remainingUpdateData } = payload

    const modifiedUpdateData: Record<string, unknown> = {...remainingUpdateData}


// make transfarm 
    //   name?.firstName = 'shuvo'
    // guardian?.fatherContactNo= '454666'

    if(name && Object.keys(name).length){
        for(const [key, value] of Object.entries(name)){
            modifiedUpdateData[`name.${key}`] = value
        }
    }


    if(guardian && Object.keys(guardian).length){
        for(const [key, value] of Object.entries(guardian)){
            modifiedUpdateData[`guardian.${key}`] = value
        }
    }

    if(localGuardian && Object.keys(localGuardian).length){
        for(const [key, value] of Object.entries(localGuardian)){
            modifiedUpdateData[`localGuardian.${key}`] = value
        }
    }


    console.log(modifiedUpdateData)
    const result = Student.findOneAndUpdate({id:id}, modifiedUpdateData, {new:true, runValidators: true})
    return result
}




export const studentService = {
    // createStudentIntoDB,
    getAllstudentFromDB,
    studentSingleData,
    deletedStudentFromDB,
    updateStudentFromDB
}

