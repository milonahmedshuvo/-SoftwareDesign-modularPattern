import { TAcademicSemester } from "../academicSemester/academicSemester.interfece";
import { User } from "./user.model";


const findLastStudentId = async () => {
    const lastStudent = await User.findOne({role: "student"}, {
        id: 1,
        _id: 0
    }).sort({
        createdAt: -1, //dissending sort data mane nis thke
      }).lean()

    //   return lastStudent?.id ? lastStudent.id : undefined;
return lastStudent?.id ? lastStudent.id : undefined 

}



export const generateStudentId = async (payload:TAcademicSemester) => {
    // console.log("admission semester generated", payload)


    let currentId = (0).toString() 
    
    // 2030 02 0002
    const lastStudentId = await findLastStudentId()

    const lastStudentIdCode = lastStudentId?.substring(4, 6) //02
    const lastStudentIdYear = lastStudentId?.substring(0, 4) //2030

    const currentSemesterCode = payload.code
    const currentSemesterYear = payload.year

    if(lastStudentId && lastStudentIdCode === currentSemesterCode && lastStudentIdYear === currentSemesterYear){
        currentId = lastStudentId.substring(6)
    }




    let incrementId = (Number(currentId) + 1 ).toString().padStart(4,'0')
    incrementId = `${payload.year}${payload.code}${incrementId}`

    return incrementId
}