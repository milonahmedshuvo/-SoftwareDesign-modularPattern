import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interfece";
import { AcademicSemesterCode, AcademicSemesterName, Months } from "./academic.constant";





const academicSemesterSchema = new Schema <TAcademicSemester> ({
    name: {
         type: String, 
         required: true,
         enum: AcademicSemesterName   //string[]
        },
    code: {
        type: String,
        required: true,
        enum: AcademicSemesterCode
    },
    year: {
        type: String,
        required: true
    },
    startMonth: {
        type: String,
        required: true,
        enum: Months
    },
    endMonth: {
        type: String,
        required: true,
        enum: Months
    } 

},
{
    timestamps: true,
}
)





// creating model and callection 
export const AcademicSemester = model <TAcademicSemester> ("academicSemester", academicSemesterSchema)