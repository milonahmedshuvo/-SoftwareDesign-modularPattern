export type TErrorSource = {
    path: string | number,
    message: string
 }[]


 export type TGenaricReturnResponse = {
    statusCode: number | string,
    message: string,
    errorSource: TErrorSource
}
