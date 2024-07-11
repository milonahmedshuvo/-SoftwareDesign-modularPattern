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


export const academicSemesterServices = {
    createAcademicSemesterFromDB
}