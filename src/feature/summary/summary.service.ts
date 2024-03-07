import { Constant } from "../../config/constant/common.constant"
import { db } from "../../config/db/db"
import { ParkingRecordSchema } from "../../config/db/schema/parking-record.schema"
import DateUtil from "../../utils/date.util"

export const SummaryService = {
    get: async () => {
        // todo: date filter
        const allParkedRecordOnADay = await db.select().from(ParkingRecordSchema)
        // total vehicles on a day
        const totalVehicle = allParkedRecordOnADay.length

        // total parking time + fee collected
        let totalParkingTime = 0
        for (const record of allParkedRecordOnADay) {
            if (record.exitTime) {
                totalParkingTime += DateUtil.roundTotalTime(record.entryTime, record.exitTime)
            }
        }
        return {
            totalVehicle,
            totalParkingTime,
            totalFee: totalParkingTime * Constant.PER_HOUR_PRICE,
        }
    },
}
