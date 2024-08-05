import QueryBuilder from "../../builder/queryBuilder";
import AppError from "../../error/appError";
import { AcademicSemester } from "../academicSemester/academic.model";
import { RegistrationStatus } from "./semesterRegistration.constant";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";



const createSemesterRegistrationIntoDB = async (payload:TSemesterRegistration) => {
   const academicSemester = payload.academicSemester

    //  check academic semester id from academicSemester 
     const isAcademicSemesterExists = await AcademicSemester.findById(academicSemester)

     if(!isAcademicSemesterExists){
        throw new AppError(400, 'Academic semestion not found!')
     }


    //  Check Semester Register 
    const isSemesterRegistrationExists = await SemesterRegistration.findOne({academicSemester})

    if(isSemesterRegistrationExists){
        throw new AppError(400, "Already have Semester Registration")
    }




    // check is exists status upcoming and ongoing in database, if have upcoming and onging throw new error  

    const isStatusUpcomingAndOngoingExists = await SemesterRegistration.findOne( { 
        $or: [
            {status: RegistrationStatus.UPCOMING},
            {status: RegistrationStatus.ONGOING}
        ]
     } )

     if(isStatusUpcomingAndOngoingExists){
          throw new AppError(400, `already have ${isStatusUpcomingAndOngoingExists.status} register semester `)
     }




    const result = await SemesterRegistration.create(payload)
    return result

}




const getAllSemesterRegistrationFromDB = async (query: Record<string, unknown>) => {

    const querySemesterRegistration = new QueryBuilder(SemesterRegistration.find().populate('academicSemester'), query).filter().sort().paginate().fields()

    const result = await querySemesterRegistration.modelQuery

    return result
}





const getSingleSemesterRegistrationFromDB = async (id: string) => {  
      const result = await SemesterRegistration.findById(id).populate('academicSemester')
      return result
}





const updateSemesterRegistrationIntoDB =  async (id: string, payload:Partial<TSemesterRegistration> ) => {


    const isExistsSemesterRegistration = await SemesterRegistration.findById(id)

    if(!isExistsSemesterRegistration){
        throw new AppError(400, 'Semester registration not found')
    }

    const requestStatus = payload.status
    const currentSemesterStatus = isExistsSemesterRegistration.status
    
    if( currentSemesterStatus === RegistrationStatus.ENDED){
        throw new AppError(400, `This semester already ${currentSemesterStatus}`)
    }




    // process fllow line by line  upcoming > ongoing > ended 
     
    if(currentSemesterStatus === RegistrationStatus.UPCOMING && requestStatus === RegistrationStatus.ENDED){
        throw new AppError(400, `You can not change from ${currentSemesterStatus} to ${requestStatus}`)
    }


    if(currentSemesterStatus === RegistrationStatus.ONGOING && requestStatus === RegistrationStatus.UPCOMING){
        throw new AppError(400, `You can not change from ${currentSemesterStatus} to ${requestStatus}`)
    }



    const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {new: true})
    return result
}

export const semesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationIntoDB
}