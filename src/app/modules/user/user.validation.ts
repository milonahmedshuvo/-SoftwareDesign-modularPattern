import { z } from "zod";

const userValidationSchema = z.object({
    // id: z.string(),
    password: z.string({ invalid_type_error: "string type error"}).max(20, {message: "you maintaince string length"}).optional(),
    // needsPasswordChange: z.boolean().optional().default(true),
    // role: z.enum(['student', 'faculty', 'admin']),
    // status: z.enum(['in-progress', 'blocked' ]).default('in-progress'),
    // isDeleted: z.boolean().optional().default(false)
})


export const userValidation = {
    userValidationSchema
}

