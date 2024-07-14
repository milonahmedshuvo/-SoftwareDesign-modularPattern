import mongoose, { model, Schema } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interfece";


const academicFacultySchema = new Schema<TAcademicFaculty>({
    name: {
        type: String,
        required: true,
        unique: true
    }
},
{
    timestamps: true
})


export const AcademicFaculty = model<TAcademicFaculty> ("Academicfaculty", academicFacultySchema)