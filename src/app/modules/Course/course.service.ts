import mongoose from "mongoose"
import QueryBuilder from "../../builder/queryBuilder"
import { CourseSearchableFields } from "./course.conts"
import { TCourse, TCourseFaculties } from "./course.interfece"
import { Course, courseFaculty } from "./course.model"
import AppError from "../../error/appError"




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









const updateCourseIntoDB = async (id:string, payload:TCourse) => {
    const { preRequisiteCourses, ...remaingCourseData } = payload

 
    const session = await mongoose.startSession()

    try {

        session.startTransaction()


    //  step=1 basic update course info 
    const updateBasicInfoCourse = await Course.findByIdAndUpdate(id, remaingCourseData, {new: true, runValidators: true, session })
    //  console.log({updateBasicInfoCourse})

    if(!updateBasicInfoCourse){
        throw new AppError(400, 'Failed to update course')
    }
    


    


    // if we have proRequisite course and want to update and delete 
    if(preRequisiteCourses && preRequisiteCourses.length){
        
        //  if get course id and status true then delete from database 

        const deletedPreRequisite = preRequisiteCourses.filter(el=> el.course && el.isDeleted ).map(el=> el.course)
        const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
            id,
            {$pull: { preRequisiteCourses: { course: {$in: deletedPreRequisite} } }},
            {new: true, runValidators: true, session}        
        )

        // console.log({deletedPreRequisiteCourses})

         if(!deletedPreRequisiteCourses){
            throw new AppError(400, 'Failed to update course')
         }




         
    //    i want add new preRequisite course if i have to isdeleted false 
    const newPreRequisites = preRequisiteCourses.filter((el) => el.course && !el.isDeleted)
    const newPreRequisitesCoursesAdd =await Course.findByIdAndUpdate(
        id,
        {
            $addToSet: {preRequisiteCourses: {$each: newPreRequisites }  }
        },
        {new: true, runValidators: true, session}
     )

     if(!newPreRequisitesCoursesAdd){
        throw new AppError(400, 'Failed to update course')
     }
    //  console.log({newPreRequisitesCoursesAdd})
    

     

    } 


    const result = await Course.findById(id).populate("preRequisiteCourses.course")
     

    
   
   await session.commitTransaction()
   await session.endSession()

   return result
}catch(err){
   await session.abortTransaction()
   await session.endSession()
   throw new AppError(400, 'Failed to update course')
}


}







const assignFacultiesWithCourseIntoDB = async (id: string, payload: Partial<TCourseFaculties> ) => {

    

    const result = await courseFaculty.findByIdAndUpdate(
        id,
        {   
            course: id,  
            $addToSet: {faculties: {$each: payload} } 
        },
        { upsert: true, new: true }
    )


    return result
}







const removeFacultiesWithCourseFromDB= async (id: string, payload: Partial<TCourseFaculties> ) => {

    
    
    const result = await courseFaculty.findByIdAndUpdate(
        id,
        {   
          $pull : { faculties: { $in: payload } }       
        },
        { new: true }
    )


    return result
}




export const courseServices = {
    createCourseIntoDB,
    getAllCourseFromDB,
    getSingleCourseFromDB,
    deleteCourseFromDB,
    updateCourseIntoDB,
    assignFacultiesWithCourseIntoDB,
    removeFacultiesWithCourseFromDB
}