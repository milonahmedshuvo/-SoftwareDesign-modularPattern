import { object } from "joi"
import config from "../../config"
import { TStudent } from "../student/student.iterface"
import {  TUser } from "./user.interface"
import { User } from "./user.model"
import { Student } from "../student/student.model"
import { AcademicSemester } from "../academicSemester/academic.model"
import { TAcademicSemester } from "../academicSemester/academicSemester.interfece"
import { generateStudentId } from "./user.utils"
import mongoose from "mongoose"
import AppError from "../../error/appError"


const createStudentIntoDB = async ( password:string, studentData: TStudent ) => {
    
    // if( await Student.isUserExists(studentData.id)){
    //     throw new Error("you are already exists")
    //  }

    const userData: Partial <TUser> = {}

    // if password is not given , then use default password 
     userData.password = password || config.default_password as string
     userData.role = "student"

    //  find academic info 
     const admissionSemester = await AcademicSemester.findById(studentData.admissionSemester)  

     
    
   

    //  create session 
    const session = await mongoose.startSession()

    try{
        session.startTransaction()

     //  userData.id = "1787716549000"
     userData.id = await generateStudentId(admissionSemester as TAcademicSemester)


     //  create a user 
     const newUser = await User.create([userData], {session} ) //build in static methods
 
     
     if(!newUser){
        throw new AppError(404, "Filed create user")
     }


        studentData.id = newUser[0].id,
        studentData.user = newUser[0]._id
     

     
 
 
     // create a student and transaction 2 
     const newStudent = await Student.create([studentData], {session})
      
     if(!newStudent){
        throw new AppError(404, 'Filed create student')
     }


     await session.commitTransaction()
     await session.endSession()
 
     //this is instance 
     // const student = new Student(studentData)
     //   if(await student.isUserExists(studentData.id)){
     //     throw new Error("you already exists in database")
     //   }   
     // const result = student.save() //this is instence methods 


     return  newStudent

    }catch(err){
     await session.abortTransaction()
     await session.endSession()
    }

   
}













export const userService = {
    createStudentIntoDB
}
