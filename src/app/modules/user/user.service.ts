import config from "../../config"
import { TStudent } from "../student/student.iterface"
import { TUser } from "./user.interface"
import { User } from "./user.model"
import { Student } from "../student/student.model"
import { AcademicSemester } from "../academicSemester/academic.model"
import { TAcademicSemester } from "../academicSemester/academicSemester.interfece"
import { generateFacultyId, generateStudentId } from "./user.utils"
import mongoose from "mongoose"
import AppError from "../../error/appError"
import { TFaculty } from "../Faculty/faculty.interfece"
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model"
import { Faculty } from "../Faculty/faculty.model"



const createStudentIntoDB = async (password: string, studentData: TStudent) => {

   // if( await Student.isUserExists(studentData.id)){
   //     throw new Error("you are already exists")
   //  }

   const userData: Partial<TUser> = {}

   // if password is not given , then use default password 
   userData.password = password || config.default_password as string
   userData.role = "student"

   //  find academic info 
   const admissionSemester = await AcademicSemester.findById(studentData.admissionSemester)





   //  create session 
   const session = await mongoose.startSession()

   try {
      session.startTransaction()

      //  userData.id = "1787716549000"
      userData.id = await generateStudentId(admissionSemester as TAcademicSemester)


      
      //  create a user 
      const newUser = await User.create([userData], { session }) //build in static methods

      console.log(newUser)



      if (!newUser) {
         throw new AppError(404, "Filed create user")
      }


      studentData.id = newUser[0].id,
         studentData.user = newUser[0]._id





      // create a student and transaction 2 
      const newStudent = await Student.create([studentData], { session })

      if (!newStudent) {
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


      return newStudent

   } catch (err) {
    
      await session.abortTransaction()
      await session.endSession()
   }


}















// Create Faculty  

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'faculty';

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );
  

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();


  
  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

     
    // create a user (transaction-1)
  
   
      const newUser = await User.create([userData], { session }); 
     

       //create a faculty
    if (!newUser.length) {
      throw new AppError(400, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

      
    

    



   
    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });



    if (!newFaculty.length) {
      throw new AppError(400, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};



export const userService = {
   createStudentIntoDB,
   createFacultyIntoDB
}
