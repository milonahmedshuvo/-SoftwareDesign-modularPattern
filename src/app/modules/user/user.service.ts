import { object } from "joi"
import config from "../../config"
import { TStudent } from "../student/student.iterface"
import {  TUser } from "./user.interface"
import { User } from "./user.model"
import { Student } from "../student/student.model"

const createStudentIntoDB = async ( password:string, studentData: TStudent ) => {
    
    // if( await Student.isUserExists(studentData.id)){
    //     throw new Error("you are already exists")
    //  }

    const userData: Partial <TUser> = {}

    // if password is not given , then use default password 
     userData.password = password || config.default_password as string
      
    //  set user role and id
     userData.role = "student"
     userData.id = "1787665785555"
     
    //  create a user 
    const newUser = await User.create(userData) //build in static methods

    if(Object.keys(newUser).length){
       studentData.id = newUser.id,
       studentData.user = newUser._id
    }

    const newStudent = await Student.create(studentData)
     




    //this is instance 
    // const student = new Student(studentData)

    //   if(await student.isUserExists(studentData.id)){
    //     throw new Error("you already exists in database")
    //   }   
    
    // const result = student.save() //this is instence methods 
    return  newStudent
}













export const userService = {
    createStudentIntoDB
}
