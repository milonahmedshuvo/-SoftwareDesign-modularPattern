import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt"
import config from "../../config";



export const userSchema = new Schema <TUser, UserModel> ({
    id: {type:String, required: true, unique: true},
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: true },
    role: { 
        type : String,
        enum: [ "student", "faculty", "admin" ]
    },
    status : {
        type: String,
        enum: [ 'in-progress', 'blocked'],
        default: 'in-progress',
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




// check user in batabase by statics methods 

userSchema.statics.isUserExistsByCustomId = async function (id:string) {
     return await User.findOne({id})
}


// check match password in database by statics methods 

userSchema.statics.isPasswordMatch = async function (plaintextPassword, hachtextPassword) {
    return await bcrypt.compare(plaintextPassword, hachtextPassword)
}



export const User = model<TUser, UserModel >("user", userSchema)

