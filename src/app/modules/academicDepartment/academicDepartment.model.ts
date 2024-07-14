import mongoose, { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interfece";
import AppError from "../../error/appError";

const academicDepartmentSchema = new Schema <TAcademicDepartment> ({
    name: { 
        type : String, 
        required: true,
        unique: true
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref:'Academicfaculty'
    }
},
{
    timestamps: true
}
)




academicDepartmentSchema.pre("save", async function(next){
    const isExistsDepartmentname = await AcademicDepartment.findOne({name: this.name})

    if(isExistsDepartmentname){
        throw new AppError( 404, "your department name database ase")
    }


    next()
})




academicDepartmentSchema.pre('findOneAndUpdate', async function(next){
     
    const query = this.getQuery()
    const isExistsDepartment = await AcademicDepartment.findOne(query)

    if(!isExistsDepartment){
       throw new AppError(404, "This document not avaiable in database")
    }

    next()
})


// creating model and collection : 
export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema)

