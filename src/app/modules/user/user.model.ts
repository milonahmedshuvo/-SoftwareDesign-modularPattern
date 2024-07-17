import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt"
import config from "../../config";



export const userSchema = new Schema <TUser> ({
    id: {type:String, required: true, unique: true},
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
    // console.log("seltrounds", config.bcrypt_seltsRounds)

//   this.password= await bcrypt.hash(this.password, Number(config.bcrypt_seltsRounds))
    // console.log('user password', user.password)
  this.password = await bcrypt.hash(this.password, 17 )
  
   next()
})



// creating next middleware 
userSchema.post("save", async function(document, next){

    // console.log("ducument", document)
    document.password = "security parpose not save password"
    next()
})





export const User = model<TUser>("user", userSchema)

