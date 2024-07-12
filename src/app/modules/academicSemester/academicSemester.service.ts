import { AcademicSemesterNameCodeMapper } from "./academic.constant";
import { AcademicSemester } from "./academic.model";
import { TAcademicSemester } from "./academicSemester.interfece";

const createAcademicSemesterFromDB = async (payload:TAcademicSemester) => {

    
    if(AcademicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error("Your semester code not match!")
    }


    const result = await AcademicSemester.create(payload)
    return result
}




const academicSemesterSingleDataFromDB = async (id:string) => {

    const result = await AcademicSemester.findById(id)
    return result
}



const updateAcademicSemesterFromDB = async (id: string, payload:Partial<TAcademicSemester>) => {
     
    if( payload.name && payload.code && AcademicSemesterNameCodeMapper[payload.name] !== payload.code ){
        throw new Error("invalid semester code!")
    }

    const result = await AcademicSemester.findByIdAndUpdate(id, payload, {
        new: true
    })


    return result
}



const academicSemesterAllDataFromDB = async() => {
    const result = await AcademicSemester.find()
    return result
}



export const academicSemesterServices = {
    createAcademicSemesterFromDB,
    academicSemesterSingleDataFromDB,
    updateAcademicSemesterFromDB,
    academicSemesterAllDataFromDB
}