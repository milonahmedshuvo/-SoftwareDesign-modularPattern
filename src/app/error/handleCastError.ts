import mongoose from "mongoose";
import { TErrorSource, TGenaricReturnResponse } from "../interfece/error.interfece";

const handleCastError = (err:mongoose.Error.CastError):TGenaricReturnResponse => {


    let errorSource:TErrorSource = [
        {
            path: err?.path,
            message: err?.message
        }
    ]

    let statusCode= 400  
    return {
       statusCode,
       message : "Mongoose CastError invalid id",
       errorSource
    }

}


export default handleCastError;
