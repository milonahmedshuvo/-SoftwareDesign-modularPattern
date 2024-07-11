import { AcademicSemester } from "./academic.model";
import { TAcademicSemester } from "./academicSemester.interfece";

const createAcademicSemesterFromDB = async (payload:TAcademicSemester) => {

    const result = await AcademicSemester.create(payload)

    return result
}


export const academicSemesterServices = {
    createAcademicSemesterFromDB
}