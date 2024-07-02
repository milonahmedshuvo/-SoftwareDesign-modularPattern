import Joi from 'joi';


// Joi schema for UserName
const userNameValidationSchema = Joi.object({
    firstName: Joi.string()
        .max(15)
        .trim()
        .regex(/^[A-Z][a-zA-Z]*$/, 'uppercase first letter')
        .required()
        .messages({
            'string.base': 'first name should be a type of text',
            'string.empty': 'first name is required hobe',
            'string.max': '15 length ar besi hoise',
            'string.pattern.name': '{#label} is first letter uppercase hobe',
            'any.required': 'first name is required hobe'
        }),
    middleName: Joi.string().optional(),
    lastName: Joi.string().required()
});

// Joi schema for Guardian
const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().optional(),
    fatherOccupation: Joi.string().optional(),
    fatherContactNo: Joi.string().optional(),
    matherName: Joi.string().optional(),
    matherOccupation: Joi.string().optional(),
    matherContactNo: Joi.string().optional()
});

// Joi schema for LocalGuardian
const localGuardianValidationSchema = Joi.object({
    name: Joi.string().optional(),
    occupation: Joi.string().optional(),
    contactNo: Joi.string().optional(),
    address: Joi.string().optional()
});

// Joi schema for Student
const studentValidationSchema = Joi.object({
    id: Joi.string().required(),
    name: userNameValidationSchema.required().messages({
        'any.required': 'vai tumar name nai'
    }),
    gender: Joi.string()
        .valid('male', 'female')
        .required()
        .messages({
            'any.only': 'this is following by male or female',
            'any.required': 'vai tumar gender nai..'
        }),
    dateOfBirth: Joi.string().optional(),
    email: Joi.string().email().required().messages({
        'any.required': 'your email provide',
        'string.email': 'email must be a valid email'
    }),
    contactNo: Joi.string().required(),
    emergencyContactNo: Joi.string().required(),
    bloogGroup: Joi.string().valid('A-', 'A+', 'B-', 'B+', 'AB-', 'AB+', 'O-', 'O+').optional(),
    presentAddress: Joi.string().required(),
    permanentAddress: Joi.string().optional(),
    guardian: guardianValidationSchema.required(),
    localGuardian: localGuardianValidationSchema.required(),
    profileImg: Joi.string().optional(),
    isActive: Joi.string().valid('active', 'blocked').default('active')
});



export default studentValidationSchema