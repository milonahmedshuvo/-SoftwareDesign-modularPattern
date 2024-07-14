import { TAcademicDepartment } from "./academicDepartment.interfece";
import { AcademicDepartment } from "./academicDepartment.model";

const creatingAcademicDepartmentFromDB = async(payload:TAcademicDepartment) => {

      const result = await AcademicDepartment.create(payload)
      return result
}


const getAllAcademicDepartmentFromDB = async () => {
    
    const result = await AcademicDepartment.find().populate('academicFaculty')
    return result
}


const getSingleAcademicDepartmentDB = async (id:string) => {

    const result = await AcademicDepartment.findById(id).populate('academicFaculty')
    return result
}



const updateAcademicDepartmentDB = async (id: string, payload:TAcademicDepartment) => {

    const result = await AcademicDepartment.findOneAndUpdate({_id: id}, payload, {new: true})
    return result
}





export const academicDepartmentService = {
    creatingAcademicDepartmentFromDB,
    getAllAcademicDepartmentFromDB,
    getSingleAcademicDepartmentDB,
    updateAcademicDepartmentDB
}

