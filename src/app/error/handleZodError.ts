import { ZodError, ZodIssue } from "zod"
import { TErrorSource, TGenaricReturnResponse } from "../interfece/error.interfece"

const handaleZodError = (err:ZodError):TGenaricReturnResponse => {

    const errorSource:TErrorSource = err.issues.map((issue:ZodIssue)=> {
      return {
        path: issue?.path[issue.path.length -1],
        message: issue?.message
      }
    }) 


   let statusCode = 400

    return {
      statusCode,
      message: 'zod validation error',
      errorSource
    }
}



export default handaleZodError;