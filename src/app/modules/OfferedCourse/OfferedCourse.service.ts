import app from "../../../app";
import AppError from "../../error/appError";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Course } from "../Course/course.model";
import { Faculty } from "../Faculty/faculty.model";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./OfferedCourse.interface";
import { OfferedCourse } from "./OfferedCourse.model";





const createOfferedCourseIntoDB = async (payload:TOfferedCourse) => {
      
      const {semesterRegistration, academicFaculty, academicDepartment, course, faculty, section } = payload;

      const isSemesterRegistrationExits = await SemesterRegistration.findById(semesterRegistration)

      if(!isSemesterRegistrationExits){
        throw new AppError(404, 'Semester registration not found')
      }

      const  academicSemester = isSemesterRegistrationExits.academicSemester




      const isAcademicFacultyExits = await AcademicFaculty.findById(academicFaculty)

      if(!isAcademicFacultyExits){
        throw new AppError(404, "academic faculty not found")
      }


      const isAcademicDepartmentExits = await AcademicDepartment.findById(academicDepartment)

      if(!isAcademicDepartmentExits){
        throw new AppError(404, "academic department not found")
      }



      const isCourseExits = await Course.findById(course)
      if(!isCourseExits){
        throw new AppError(404,'course not found')
      }


     const isFacultyExits = await Faculty.findById(faculty)
     if(!isFacultyExits){
        throw new AppError(404, 'faculty not found')
     }





    //  if dose not exits academic faculty id in academic department 
    const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
        _id: academicDepartment,
        academicFaculty
    })

    if(!isDepartmentBelongToFaculty){
        throw new AppError(400, `This ${isAcademicDepartmentExits.name} is not blong faculty ( ${isAcademicFacultyExits.name})`)
    }



    const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection = await OfferedCourse.findOne({
        semesterRegistration,
        course,
        section
    })

    if(isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection){
        throw new AppError(400, 'Offered course with same section is already exist!')
    }


    const result = await OfferedCourse.create({...payload, academicSemester})
    return result
}










export const OfferedCourseService = {
    createOfferedCourseIntoDB
}