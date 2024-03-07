import { differenceInMinutes, format } from "date-fns"
import { Constant } from "../config/constant/common.constant"

const DateUtil = {
    // write Util function related to dates using "date-fns" library
    /**
     * @param date String "2023-06-29T06:15:21.414Z"
     * @description convert the date into date object and replace time with server time
     * @returns Date
     */
    convertClientISODateStringToDate: (date: string) => {
        const createdAtDate = new Date(date)
        createdAtDate.setHours(new Date().getHours())
        createdAtDate.setMinutes(new Date().getMinutes())
        createdAtDate.setSeconds(new Date().getSeconds())
        return createdAtDate
    },
    /**
     * @param date Date
     * @description get user local date based on this timezone
     * @returns e.g 24th Nov, 1st jan
     */
    getOnlyDate: (date: Date, timeZone: string = Constant.TIMEZONE) => {
        // return format(utcToZonedTime(date, timeZone), "do MMM")
        return format(date, "do MMM")
    },
    /**
     * @description it should receive UTC time as string
     * @param timeString "04:00:00"
     * @param dateOfMonth 1-31
     * @returns UTC Date object
     */
    convertUtcTimeStringIntoDateObject: (timeString: string, dateOfMonth: number = new Date().getDate()) => {
        const [hours, minutes, seconds] = timeString.split(":").map(Number)
        const date = new Date()
        const dateObject = new Date(
            Date.UTC(date.getFullYear(), date.getMonth(), dateOfMonth, hours, minutes, seconds, 0)
        )
        return dateObject
    },
    roundTotalTime: (startTime: Date, endTime: Date) => {
        // Example start and end times
        // const startTime = new Date("2024-03-06T10:00:00")
        // const endTime = new Date("2024-03-06T11:02:00")

        // Calculate the difference in minutes
        const timeDifference = differenceInMinutes(endTime, startTime)
        // Round up the total time to the nearest hour
        const totalHours = Math.ceil(timeDifference / 60)

        // console.log("Total time:", totalHours, "hours")
        return totalHours
    },
}
export default DateUtil
