import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interfece";

const academicDepartmentSchema = new Schema <TAcademicDepartment> ({
    name: { 
        type : String, 
        required: true,
        unique: true
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        required: true,
        raf: "AcademicFaculty"
    }
},
{
    timestamps: true
}
)



// creating model and collection : 
export const AcademicDepartment = model<TAcademicDepartment>('academicDepartment', academicDepartmentSchema)

