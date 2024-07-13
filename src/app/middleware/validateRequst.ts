import { NextFunction, Request, Response } from "express"
import { AnyZodObject } from "zod"

const validateRequst = (schema:AnyZodObject) => {

    return async (req:Request, res:Response, next:NextFunction) => {
        // console.log(req.body)
        // req.body.password,
        // req.body.student,
        
       try{
         // zod data validation 
         await schema.parseAsync({
            body: req.body
        })
         next()
         
       }catch(err){
        next(err)
       }
    }


}


export default validateRequst;