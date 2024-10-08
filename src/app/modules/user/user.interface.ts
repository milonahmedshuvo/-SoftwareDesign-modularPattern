import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser  {
    id : string;
    password: string;
    needsPasswordChange: boolean;
    role: "admin" | "student" | "faculty";
    status: "in-progress" | "blocked";
    isDeleted: boolean;
}



export interface UserModel extends Model<TUser> {
    isUserExistsByCustomId(id: string): Promise<TUser>;
    isPasswordMatch( plaintextPassword:string, hashTextPassword:string ): Promise<boolean>
}



// user role type 

export type TUserRole = keyof typeof USER_ROLE





