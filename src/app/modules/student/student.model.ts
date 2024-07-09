import { Schema, model, connect } from 'mongoose';
import {  StudentModel, TGuardian, TLocalGuardian, TStudent, TUserName } from './student.iterface';
import bcrypt from "bcrypt"
import config from '../../config';



const userNameSchema = new Schema <TUserName> ({
        firstName: {
            type: String, 
            required: [true, 'first name is required hobe'],
            maxlength: [15, '15 length ar besi hoise'],
            trim: true,
            // akane custom validation korse joi use koray dorkar nai akon
            // validate:{
            //    validator: function (value:string) {
            //         console.log(value)
            //         const stringUpper = value.charAt(0).toUpperCase() + value.slice(1)
            //         return stringUpper === value
            //     },
            //     message: '{VALUE} is first letter uppercase hobe'
            // }
        },
        middleName: {type: String},
        lastName: {type: String, required: true}
})

const guardianSchema = new Schema <TGuardian> ({
        fatherName: {type: String},
        fatherOccupation: {type: String},
        fatherContactNo: {type: String},
        matherName: {type: String},
        matherOccupation: {type: String},
        matherContactNo: {type: String}
})

const localGuardianSchema = new Schema <TLocalGuardian> ({
        name: {type: String},
        occupation: {type: String},
        contactNo: {type: String},
        address: {type: String}
})


// creating main schema.......
const studentSchema = new Schema < TStudent, StudentModel > ({
    id: {type: String, required: true, unique: true},
    user: { type: Schema.Types.ObjectId, required:[true,"user object is required" ] , unique: true },
    password: {type: String, required: true},
    name:{
        type: userNameSchema,
        required: [true, 'vai tumar name nai'],
    },
    gender: {
        type: String,
        enum: {
                values: ['male','female'],
                message: "this is following by male or female"
        },
        required: [true, 'vai tumar gender nai..']
    },
    dateOfBirth: {type: String},
    email: {type: String, required: [true, "your email provite"] },
    contactNo: {type: String, required: true},
    emergencyContactNo: {type: String, required: true },
    bloogGroup: {
        type: String,
        enum: ["A-","A+","B-","B+" ,"AB-","AB+","O-","O+"]
    },
    presentAddress: {type: String, required: true},
    permanentAddress: {type: String},
    guardian: {
        type: guardianSchema,
        required: true
    },
    localGuardian: {
        type: localGuardianSchema,
        required: true
    },
    profileImg: {type: String },
    isDeleted : {
        type: Boolean,
        default: false
    }
},
{
    // je json ta asbe sta virtuals true kore daw 
    toJSON: {
        virtuals: true
    }
}
)


// creating virtule mongoose 
studentSchema.virtual("fullName").get(function(){
    return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
})





// creating pre middleware 
studentSchema.pre("save", async function(next){
    // console.log(this, "pre middleware i will save data")
    const user= this
  user.password= await bcrypt.hash(user.password, Number(config.bcrypt_seltsRounds))
  console.log(config.bcrypt_seltsRounds)
   next()
})



// creating next middleware 
studentSchema.post("save", async function(document, next){
    
    // console.log("ducument", document)
    document.password = "security parpose not save password"
    next()
})


// query middleware 
studentSchema.pre('find', async  function (next){
    this.find({isDeleted: {$ne: true }})
    next()
})


studentSchema.pre('findOne', async  function (next){
    this.findOne({isDeleted: {$ne: true }})
    next()
})











// creating an instence methods 
// studentSchema.methods.isUserExists = async function (id: string) {
//     const existsUser = await Student.findOne({id: id})
//     return existsUser
// } 




// creating an static methods 
studentSchema.statics.isUserExists= async function(id: string) {
    const userExists = await Student.findOne({id: id})
    return userExists;
}





// create modal and make collection in database.......
export const Student = model < TStudent, StudentModel > ('student', studentSchema)
 