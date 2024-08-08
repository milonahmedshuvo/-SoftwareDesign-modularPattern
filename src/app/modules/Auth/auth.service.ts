import config from "../../config";
import AppError from "../../error/appError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import Jwt, { JwtPayload }  from "jsonwebtoken";
import bcrypt from "bcrypt"




const userLoginIntoDB = async (payload:TLoginUser) => {


   const isUserExists = await User.isUserExistsByCustomId(payload.id)



   if(!isUserExists){
    throw new AppError(400, 'This user not found!')
   }

   const isDeleted = isUserExists.isDeleted

   if(isDeleted){
    throw new AppError(400, 'This user is deleted!')
   }


   const userStatus = isUserExists.status

   if(userStatus === 'blocked'){
    throw new AppError(400, 'This user is blocked!!')
   }


//    const isPasswordValid = await bcrypt.compare(payload.password, isUserExists.password)
      const isPasswordValid = await User.isPasswordMatch(payload.password, isUserExists.password)

     if(!isPasswordValid){
        throw new AppError(400, 'Password is not match!!')
     }


  

    // jwt token genarate 
    const jwtPayload = {
        userId : isUserExists.id,
        role : isUserExists.role
    }

     
   const accestToken =  Jwt.sign( jwtPayload , config.jwt_access_token as string , { expiresIn: '10d' });



    

    return {
         accestToken, 
         needsPasswordChange : isUserExists?.needsPasswordChange
         }
     }








     const changePasswordIntoDB = async (userData:JwtPayload, payload:{oldPassword: string, newPassword: string} ) => {
        
        
        const user = await User.isUserExistsByCustomId(userData.userId)

        if(!user){
            throw new AppError(400, 'User is not found!!')
        }
 
        const isDeleted = user.isDeleted

        if(isDeleted){
         throw new AppError(400, 'This user is deleted!')
        }
     
     
        const userStatus = user.status
     
        if(userStatus === 'blocked'){
         throw new AppError(400, 'This user is blocked!!')
        }


        // checking password match 

        const passwordMatch = await User.isPasswordMatch(payload.oldPassword, user.password)

        if(!passwordMatch){
            throw new AppError(404, 'your password not match!!')
        }


        // if(passwordMatch){
        //     throw new AppError(404, 'your password match!!')
        // }


        const newHashPassword = await bcrypt.hash(payload.newPassword, 17 )
   
        


         await User.findOneAndUpdate({
            id: userData.userId,
            role: userData.role
        },
        //  update password this 
        {
            password: newHashPassword,
            needsPasswordChange: false
        } )
        

    return null
     }

export const authService = {
    userLoginIntoDB,
    changePasswordIntoDB
}