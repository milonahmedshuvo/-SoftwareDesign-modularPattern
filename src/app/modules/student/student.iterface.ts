import { Schema, model, connect, Model } from 'mongoose';

export type TUserName = {
    firstName: string;
    middleName: string;
    lastName: string;
}

export type TGuardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    matherName: string;
    matherOccupation: string;
    matherContactNo: string
}

export type TLocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
}


export type TStudent = {
    id: string;
    password: string;
    name:TUserName; 
    gender: "male" | "female";
    dateOfBirth?: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloogGroup?: "A-" | "A+" | "B-" | "B+" | "AB-" | "AB+" | "O-" | "O+";
    presentAddress: string;
    permanentAddress: string;
    guardian: TGuardian;
    localGuardian: TLocalGuardian;
    profileImg?: string;
    isActive: "active" | "blocked";
    isDeleted: boolean
}


// export type StudentMethods = {
//     isUserExists(id:string): Promise< TStudent | null >
// }

// export type StudentModel = Model<TStudent, {}, StudentMethods>;




// static methods interface 

export interface StudentModel extends Model<TStudent> {
    isUserExists(id: string): Promise <TStudent | null >
  }


  