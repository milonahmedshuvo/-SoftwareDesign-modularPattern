import { z } from "zod";
import { Days } from "./OfferedCourse.constant";


// make hours and time formet by rezax 10:30
const timeStringSchema = z.string().refine((time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
},{message: 'Invalid time format , expected "HH:MM" in 24 hours format'})





const createOfferedCourseValidationSchema = z.object({
    body: z.object({
        semesterRegistration: z.string(),
        // academicSemester: z.string(),
        academicFaculty: z.string(),
        academicDepartment: z.string(),
        course: z.string(),
        faculty: z.string(),
        maxCapacity: z.number(),
        section: z.number(),
        days: z.array(z.enum(['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'])),
        startTime: timeStringSchema,
        endTime: timeStringSchema
    }).refine((body)=> {

        const startTime = new Date(`1997-01-01T${body.startTime}:00`)
        const endTime = new Date(`1997-01-01T${body.endTime}:00`)

        return endTime > startTime
    },{message: `StartTime sholud be small to end time`})
})




const updateOfferedCourseValidationSchema = z.object({
    body: z.object({
        maxCapacity: z.number().optional(),
        section: z.number().optional(),
        days: z.array(z.enum([...Days] as [string, ...string[] ] )).optional(),
        startTime: timeStringSchema.optional(),
        endTime: timeStringSchema.optional()
    })
})




export const offeredCourseValidation = {
    createOfferedCourseValidationSchema,
    updateOfferedCourseValidationSchema
}
