import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt"
import config from "../../config";



export const userSchema = new Schema <TUser> ({
    id: {type:String},
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: true },
    role: { 
        type : String,
        enum: [ "student", "faculty", "admin" ]
    },
    status : {
        type: String,
        enum: [ 'in-progress', 'blocked']
    },
    isDeleted : { type: Boolean, default: false }
},
// mongoose provited timestamps 
{
    timestamps : true
}
)




// creating pre middleware 
userSchema.pre("save", async function(next){
    // console.log(this, "pre middleware i will save data")
    const user= this
  user.password= await bcrypt.hash(user.password, Number(config.bcrypt_seltsRounds))
  console.log(config.bcrypt_seltsRounds)
   next()
})



// creating next middleware 
userSchema.post("save", async function(document, next){
    
    // console.log("ducument", document)
    document.password = "security parpose not save password"
    next()
})





export const User = model<TUser>("user", userSchema)

