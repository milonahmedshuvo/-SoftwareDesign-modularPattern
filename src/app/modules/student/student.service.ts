import { Student } from "./student.iterface";
import { studentModel } from "./student.model";

const createStudentIntoDB = async (student: Student ) => {
    const result = await studentModel.create(student)
    return result
}

const getAllstudentFromDB = async () => {
    const result = await studentModel.find()
    return result
}

const studentSingleData = async (id: string ) => {
    const result = studentModel.findOne({id})
    return result
}


export const studentService = {
    createStudentIntoDB,
    getAllstudentFromDB,
    studentSingleData
}

