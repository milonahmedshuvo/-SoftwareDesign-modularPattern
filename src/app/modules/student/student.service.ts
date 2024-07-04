import { TStudent } from "./student.iterface";
import { Student } from "./student.model";

const createStudentIntoDB = async (studentData: TStudent ) => {
    
    if( await Student.isUserExists(studentData.id)){
        throw new Error("you are already exists")
     }

     
     
    
    const result = await Student.create(studentData) //build in static methods

     




    //this is instance 
    // const student = new Student(studentData)

    //   if(await student.isUserExists(studentData.id)){
    //     throw new Error("you already exists in database")
    //   }   
    
    // const result = student.save() //this is instence methods 



    return result
}

const getAllstudentFromDB = async () => {
    const result = await Student.find()
    return result
}

const studentSingleData = async (id: string ) => {
    const result = Student.findOne({id})
    return result
}


const deletedStudentFromDB = async (id: string) => {
      const result = await Student.updateOne({id: id}, {isDeleted: true})
      return result
}





export const studentService = {
    createStudentIntoDB,
    getAllstudentFromDB,
    studentSingleData,
    deletedStudentFromDB
}

