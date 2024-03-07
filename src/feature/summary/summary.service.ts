import { and, sql } from "drizzle-orm"
import { ICurrentUser } from "../../common/model/current-user.model"
import { DateString } from "../../common/model/date.type"
import { Constant } from "../../config/constant/common.constant"
import { db } from "../../config/db/db"
import { ParkingRecordSchema } from "../../config/db/schema/parking-record.schema"
import DateUtil from "../../utils/date.util"

export const SummaryService = {
    get: async (date: DateString, user: ICurrentUser) => {
        const userDateWithTimeZone = DateUtil.getUtcToZonedDateTime(new Date(date), user.timeZone)

        const allParkedRecordOnADay = await db
            .select()
            .from(ParkingRecordSchema)
            .where(
                and(
                    sql`date(CONVERT_TZ(${ParkingRecordSchema.entryTime},'UTC',${user.timeZone}))=date(${userDateWithTimeZone})`
                )
            )
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
