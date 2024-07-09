import { Student } from "./student.model";



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
    // createStudentIntoDB,
    getAllstudentFromDB,
    studentSingleData,
    deletedStudentFromDB
}

