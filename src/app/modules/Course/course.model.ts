import { model, Schema } from "mongoose";
import { TCourse, TCourseFaculties, TPreRequisiteCourses } from "./course.interfece";



const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})




const coursesSchema = new Schema<TCourse>({
    title: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    prefix: {
        type: String,
        trim: true,
        required: true
    },
    code: {
        type: Number,
        trim: true,
        required: true
    },
    credits: {
        type: Number,
        trim: true,
        required: true
    },
    preRequisiteCourses: [preRequisiteCoursesSchema],
    isDeleted: {
        type: Boolean,
        default: false,
      },
},
{ timestamps: true}
)




// creating model 

export const Course = model<TCourse>('Course', coursesSchema)




// schema 2 

const courseFacultysSchema = new Schema<TCourseFaculties>({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        unique: true
    },
    faculties: [
        {
            type: Schema.Types.ObjectId,
            ref: "Faculty"
        }
    ]
})



// creating model 
export const courseFaculty = model<TCourseFaculties>('CourseFaculty', courseFacultysSchema)