import mongoose from "mongoose";
import { Student } from "./student.model";
import AppError from "../../error/appError";
import { User } from "../user/user.model";
import { TStudent } from "./student.iterface";






const getAllstudentFromDB = async (query:Record<string, unknown>) => {

    let queryObj = {...query}
    

    let searchTerm =''

    if(query?.searchparm){
          searchTerm = query?.searchTerm as string
    }

   let searchQuery = Student.find({
    $or: ['email', 'name.firstName', 'presentAddress', 'id'].map((filed) => ({
        [filed] : { $regex: searchTerm, $options: 'i' }
    }))
})

     
    const excludeFileds = ['searchTerm', 'sort', 'limit', 'page', 'fields']
    excludeFileds.forEach((el)=> delete queryObj[el] ) //delete element


    console.log({query, queryObj})

    const filterQuery = searchQuery.find(queryObj).populate('admissionSemester').populate({
        path: 'admissionDepartment',
        populate: "academicFaculty"
    })

   
    let sort = '-createdAt'
    if(query.sort){
        sort = query.sort as string
    }

    const sortQuery = filterQuery.sort(sort)
   




    let limit = 1
    let page = 1
    let skip = 0
    if(query.limit){
        limit = Number(query.limit) 
    }

    if(query?.page){
        page= Number(query.page)
        skip = (page - 1) * limit
    }

    //pagination start.....
    const paginationQuery = sortQuery.skip(skip)
    const limitQuery = paginationQuery.limit(limit)
    


    // select spisic fields /mane je gulo fields pai
    let fields = '-_v'
    if(query?.fields){
        fields= (query.fields as string).split(',').join(" ")
    }
    
    const fieldsQuery = await limitQuery.select(fields) 



    return fieldsQuery
}







const studentSingleData = async (id: string ) => {
    const result = Student.findOne({id: id})
    return result
}


const deletedStudentFromDB = async (id: string) => {

      const session = await mongoose.startSession()


      try{
        session.startTransaction()

        const studentDeleted = await Student.findOneAndUpdate(
            {id: id}, 
            {isDeleted: true},
            {new: true, session}
        )

        if(!studentDeleted){
           throw new AppError(400, 'Filed delete student')
        }




        const userDeleted = await User.findOneAndUpdate( 
            {id:id},
            {isDeleted: true},
            {new: true, session}
        )

        if(!userDeleted){
            throw new AppError(400, 'Filed deleted user')
        }

        await session.commitTransaction()
        await session.endSession()

        return  studentDeleted

      }catch(err){
            await session.abortTransaction()
            await session.endSession()
      }
      
}



const updateStudentFromDB = async (id: string, payload:Partial<TStudent>) => {

    const {name,guardian, localGuardian, ...remainingUpdateData } = payload

    const modifiedUpdateData: Record<string, unknown> = {...remainingUpdateData}


// make transfarm 
    //   name?.firstName = 'shuvo'
    // guardian?.fatherContactNo= '454666'

    if(name && Object.keys(name).length){
        for(const [key, value] of Object.entries(name)){
            modifiedUpdateData[`name.${key}`] = value
        }
    }


    if(guardian && Object.keys(guardian).length){
        for(const [key, value] of Object.entries(guardian)){
            modifiedUpdateData[`guardian.${key}`] = value
        }
    }

    if(localGuardian && Object.keys(localGuardian).length){
        for(const [key, value] of Object.entries(localGuardian)){
            modifiedUpdateData[`localGuardian.${key}`] = value
        }
    }


    // console.log(modifiedUpdateData)
    const result = Student.findOneAndUpdate({id:id}, modifiedUpdateData, {new:true, runValidators: true})
    return result
}




export const studentService = {
    // createStudentIntoDB,
    getAllstudentFromDB,
    studentSingleData,
    deletedStudentFromDB,
    updateStudentFromDB
}

