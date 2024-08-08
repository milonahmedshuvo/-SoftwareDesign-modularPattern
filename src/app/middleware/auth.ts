import { NextFunction, Request, Response } from "express";
import AppError from "../error/appError";
import jwt, { JwtHeader, JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";

// ...requistUserRole:TUserRole[]

const auth = (...requistUserRole:TUserRole[]) => {


    return async (req:Request, res:Response, next:NextFunction ) => {

        const token = req.headers.authorization
       

        if(!token) {
            throw new AppError(400, 'Authentication token is unvalid!!')
        }

        jwt.verify(token, config.jwt_access_token as string, (err, decoded) => {
            
            if(err){
                throw new AppError(400, 'you are not authoried!!')
            }


           
            // check role such student, faculty and admin 
            const role = (decoded as JwtPayload).role 
            if(requistUserRole && !requistUserRole.includes(role)) {
                console.log("ar vitor kn aso", role)
                console.log({requistUserRole})
                throw new AppError(400, 'you are not authoried!!')
            }

            


            req.user = decoded as JwtHeader
            next()
        })   
    }
}



export default auth