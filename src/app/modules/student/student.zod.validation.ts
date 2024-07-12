import { z } from 'zod';

// Zod schema for UserName
const userNameValidationSchema = z.object({
  firstName: z.string().max(15, { message: '15 length ar besi hoise' }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: 'last name is required' })
});

// Zod schema for Guardian
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  matherName: z.string().min(1),
  matherOccupation: z.string().min(1),
  matherContactNo: z.string().min(1),
});

// Zod schema for LocalGuardian
const localGuardianValidationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1)
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
    profileImg: z.string().optional(),
    })
    
  })
});


export const studentValidations = {
  studentZodValidationSchema
}

