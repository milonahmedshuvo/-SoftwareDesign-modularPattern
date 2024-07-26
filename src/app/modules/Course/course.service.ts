import QueryBuilder from "../../builder/queryBuilder"
import { CourseSearchableFields } from "./course.conts"
import { TCourse } from "./course.interfece"
import { Course } from "./course.model"




const createCourseIntoDB = async (payload:TCourse) => {
    const result = await Course.create(payload)
    return result
}



const getAllCourseFromDB = async (query:Record<string, unknown>) => {

    const courseQuery = new QueryBuilder(Course.find().populate('preRequisiteCourses.course'), query)
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()
    const result = await  courseQuery.modelQuery
    return result
}


const getSingleCourseFromDB = async (id:string) => {
    const result = await Course.findById(id).populate('preRequisiteCourses.course')
    return result
}


const deleteCourseFromDB = async (id:string) => {
    const result = await Course.findByIdAndUpdate(id, {isDeleted: true}, {new: true})
    return result
}




export const courseServices = {
    createCourseIntoDB,
    getAllCourseFromDB,
    getSingleCourseFromDB,
    deleteCourseFromDB
}