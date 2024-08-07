import { Model } from "mongoose";

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









