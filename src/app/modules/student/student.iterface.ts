import { Schema, model, connect } from 'mongoose';

export type UserName = {
    firstName: string;
    middleName: string;
    lastName: string;
}

export type Guardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    matherName: string;
    matherOccupation: string;
    matherContactNo: string
}

export type LocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
}


export type Student = {
    id: string;
    name:UserName; 
    gender: "male" | "female";
    dateOfBirth?: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloogGroup?: "A-" | "A+" | "B-" | "B+" | "AB-" | "AB+" | "O-" | "O+";
    presentAddress: string;
    permanentAddress: string;
    guardian: Guardian;
    localGuardian: LocalGuardian;
    profileImg?: string;
    isActive: "active" | "blocked"
}