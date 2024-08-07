import { query } from "express";
import app from "../../../app";
import AppError from "../../error/appError";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Course } from "../Course/course.model";
import { Faculty } from "../Faculty/faculty.model";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./OfferedCourse.interface";
import { OfferedCourse } from "./OfferedCourse.model";
import { hasTimeConflict } from "./OfferedCourse.utils";
import QueryBuilder from "../../builder/queryBuilder";





const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {

  const { semesterRegistration, academicFaculty, academicDepartment, course, faculty, section, days, startTime, endTime } = payload;

  const isSemesterRegistrationExits = await SemesterRegistration.findById(semesterRegistration)

  if (!isSemesterRegistrationExits) {
    throw new AppError(404, 'Semester registration not found')
  }

  const academicSemester = isSemesterRegistrationExits.academicSemester




  const isAcademicFacultyExits = await AcademicFaculty.findById(academicFaculty)

  if (!isAcademicFacultyExits) {
    throw new AppError(404, "academic faculty not found")
  }


  const isAcademicDepartmentExits = await AcademicDepartment.findById(academicDepartment)

  if (!isAcademicDepartmentExits) {
    throw new AppError(404, "academic department not found")
  }



  const isCourseExits = await Course.findById(course)
  if (!isCourseExits) {
    throw new AppError(404, 'course not found')
  }


  const isFacultyExits = await Faculty.findById(faculty)
  if (!isFacultyExits) {
    throw new AppError(404, 'faculty not found')
  }





  //  if dose not exits academic faculty id in academic department 
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty
  })

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(400, `This ${isAcademicDepartmentExits.name} is not blong faculty ( ${isAcademicFacultyExits.name})`)
  }



  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection = await OfferedCourse.findOne({
    semesterRegistration,
    course,
    section
  })

  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(400, 'Offered course with same section is already exist!')
  }





  // check class time 
  const assignSchedule = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days }
  }).select('days startTime endTime')


  const newSchedule = {
    days,
    startTime,
    endTime
  }


  // 10:00 12:00
  // 09:00 11:00
  // assignSchedule.forEach((schedule) => { })

  if (hasTimeConflict(assignSchedule, newSchedule)) {
    throw new AppError(400, 'This faculty is not available at that time ! Choose other time or day')
  }



  const result = await OfferedCourse.create({ ...payload, academicSemester })
  return result

}






// get all offered course 

const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {

  const offerCourseQuery = new QueryBuilder(OfferedCourse.find(), query).filter().sort().paginate().fields()
  const result = await offerCourseQuery.modelQuery

  return result
}



const getSingleOfferedCourseFromDB = async (id: string) => {

  const offeredCourse = await OfferedCourse.findById(id)

  if (!offeredCourse) {
    throw new AppError(404, 'Offered course single not found!!')
  }

  return offeredCourse
}




const updateSingleOfferedCourseIntoDB = async (id: string, payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,  ) => {
  /**
* Step 1: check if the offered course exists
* Step 2: check if the faculty exists
* Step 3: check if the semester registration status is upcoming
* Step 4: check if the faculty is available at that time. If not then throw error
* Step 5: update the offered course
*/
  const { faculty, startTime, endTime, days } = payload


  const isOfferedCourseExits = await OfferedCourse.findById(id)

  if (!isOfferedCourseExits) {
    throw new AppError(404, 'Offered course not found')
  }


  const isFacultyExits = await Faculty.findById(faculty)

  if (!isFacultyExits) {
    throw new AppError(404, 'Faculty is not found')
  }


  const semesterRegistration = isOfferedCourseExits.semesterRegistration

  // Checking the status of the semester registration
  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(404, `You can not update this offered course as it is ${semesterRegistrationStatus?.status}`,);
  }





  // check class time by weeekly
  const assignSchedule = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days }
  }).select('days startTime endTime')


  const newSchedule = {
    days,
    startTime,
    endTime
  }


  // 10:00 12:00
  // 09:00 11:00
  // assignSchedule.forEach((schedule) => { })

  if (hasTimeConflict(assignSchedule, newSchedule)) {
    throw new AppError(400, 'This faculty is not available at that time ! Choose other time or day')
  }



  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {new:true} )
  return result

}






const deleteOfferedCourseFromDB = async (id: string) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the semester registration status is upcoming
   * Step 3: delete the offered course
   */

  const isOfferedCourseExits = await OfferedCourse.findById(id)

  if(!isOfferedCourseExits){
    throw new AppError(404, 'Offered course not found')
  }



   const semesterRegistration = isOfferedCourseExits.semesterRegistration
   const semesterRegistrationStatus = await SemesterRegistration.findById(semesterRegistration).select('status')

   if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(404 ,`Offered course can not delete ! because the semester ${semesterRegistrationStatus?.status}`, );
  }



  const result = await OfferedCourse.findByIdAndDelete(id)

  return result

}



export const OfferedCourseService = {
  createOfferedCourseIntoDB,
  getAllOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  updateSingleOfferedCourseIntoDB,
  deleteOfferedCourseFromDB
}