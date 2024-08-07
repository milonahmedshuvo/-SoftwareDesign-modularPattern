import { TSchedule } from "./OfferedCourse.interface";


export const hasTimeConflict = (assignSchedule:TSchedule[], newSchedule:TSchedule) => {

      for (const schedule of assignSchedule) {
      const startTime = new Date(`1970-01-01T${schedule.startTime}`)
      const endTime = new Date(`1970-01-01T${schedule.endTime}`)
      const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`)
      const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`)

      if(newStartTime < endTime &&  newEndTime > startTime ){
        return true
      }
    }


    return false
}