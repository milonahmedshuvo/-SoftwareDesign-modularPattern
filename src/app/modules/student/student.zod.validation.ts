import { z } from 'zod';

// Zod schema for UserName
const userNameValidationSchema = z.object({
  firstName: z.string().max(15, { message: '15 length ar besi hoise' }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: 'last name is required' })
});

// Zod schema for Guardian
const guardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  matherName: z.string(),
  matherOccupation: z.string(),
  matherContactNo: z.string(),
});

// Zod schema for LocalGuardian
const localGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string()
});

// Zod schema for Student
const studentZodValidationSchema = z.object({
  body: z.object({
    // id: z.string().min(1, { message: 'ID is required' }), 
    password: z.string().max(20, { message: 'Password is required in zod' }),

    student: z.object({
      name: userNameValidationSchema,
    gender: z.enum(['male', 'female'], { message: 'this is following by male or female' }).refine((val) => !!val, { message: 'vai tumar gender nai..' }),
    dateOfBirth: z.string().optional(),
    email: z.string().email({ message: 'email must be a valid email' }).refine((val) => !!val, { message: 'your email provide' }),
    contactNo: z.string().min(1, { message: 'Contact number is required' }),
    emergencyContactNo: z.string().min(1, { message: 'Emergency contact number is required' }),
    bloogGroup: z.enum(['A-', 'A+', 'B-', 'B+', 'AB-', 'AB+', 'O-', 'O+']).optional(),
    presentAddress: z.string().min(1, { message: 'Present address is required' }),
    permanentAddress: z.string(),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    admissionSemester: z.string(),
    admissionDepartment: z.string(),
    profileImg: z.string().optional(),
    })
    
  })
});






// update student validation 

// / Zod schema for UserName
const updateUserNameValidationSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().max(19, { message: 'last name is required' }).optional()
});

// Zod schema for Guardian
const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  matherName: z.string().optional(),
  matherOccupation: z.string().optional(),
  matherContactNo: z.string().optional(),
});

// Zod schema for LocalGuardian
const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional()
});

// Zod schema for Student
const updateStudentZodValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema.optional(),
    gender: z.enum(['male', 'female'], { message: 'this is following by male or female' }).refine((val) => !!val, { message: 'vai tumar gender nai..' }).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email({ message: 'email must be a valid email' }).refine((val) => !!val, { message: 'your email provide' }).optional(),
    contactNo: z.string().max(10, { message: 'Contact number is required' }).optional(),
    emergencyContactNo: z.string().min(1, { message: 'Emergency contact number is required' }).optional(),
    bloogGroup: z.enum(['A-', 'A+', 'B-', 'B+', 'AB-', 'AB+', 'O-', 'O+']).optional(),
    presentAddress: z.string().min(1, { message: 'Present address is required' }).optional(),
    permanentAddress: z.string().optional(),
    guardian: updateGuardianValidationSchema.optional(),
    localGuardian: updateLocalGuardianValidationSchema.optional(),
    admissionSemester: z.string().optional(),
    admissionDepartment: z.string().optional(),
    profileImg: z.string().optional(),
    })
    
  })
});


export const studentValidations = {
  studentZodValidationSchema,
  updateStudentZodValidationSchema
}

