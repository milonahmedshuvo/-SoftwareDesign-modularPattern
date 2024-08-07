import config from "../../config";
import AppError from "../../error/appError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import Jwt  from "jsonwebtoken";





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

    console.log(jwtPayload)
   const accestToken =  Jwt.sign( jwtPayload , config.jwt_access_token as string , { expiresIn: '10d' });



    

    return {
         accestToken, 
         needsPasswordChange : isUserExists?.needsPasswordChange }
     }









export const authService = {
    userLoginIntoDB
}