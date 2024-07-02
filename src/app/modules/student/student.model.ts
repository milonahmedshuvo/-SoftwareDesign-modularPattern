import { Schema, model, connect } from 'mongoose';
import { Guardian, LocalGuardian, Student, UserName } from './student.iterface';


const userNameSchema = new Schema <UserName> ({
        firstName: {type: String, required: true},
        middleName: {type: String},
        lastName: {type: String, required: true}
})

const guardianSchema = new Schema <Guardian> ({
        fatherName: {type: String},
        fatherOccupation: {type: String},
        fatherContactNo: {type: String},
        matherName: {type: String},
        matherOccupation: {type: String},
        matherContactNo: {type: String}
})

const localGuardianSchema = new Schema <LocalGuardian> ({
        name: {type: String},
        occupation: {type: String},
        contactNo: {type: String},
        address: {type: String}
})


// create main schema.......

const studentSchema = new Schema <Student> ({
    id: {type: String},
    name:userNameSchema,
    gender: ['male','female'],
    dateOfBirth: {type: String},
    email: {type: String, required: true},
    contactNo: {type: String, required: true},
    emergencyContactNo: {type: String, required: true },
    bloogGroup: {type: String },
    presentAddress: {type: String, required: true},
    permanentAddress: {type: String},
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImg: {type: String },
    isActive: ['active', 'blocked']    
})



// create modal and make collection in database.......
export const studentModel = model <Student> ('student', studentSchema)
