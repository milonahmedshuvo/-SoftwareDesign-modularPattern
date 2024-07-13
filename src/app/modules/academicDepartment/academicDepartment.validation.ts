import { z } from "zod";


const creatingAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Academic department must be string",
            required_error: "name is required"
        }),
        academicFaculty: z.string({
            invalid_type_error: "academic faculty is required",
            required_error: "Faculty is required"
        })
    })
})


const updateAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Academic department must be string",
            required_error: "name is required"
        }).optional(),
        academicFaculty: z.string({
            invalid_type_error: "academic faculty is required",
            required_error: "Faculty is required"
        }).optional()
    })
})



export const academicDepartmentValidations = {
    creatingAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema
}
