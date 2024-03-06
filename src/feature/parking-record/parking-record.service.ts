import { and, asc, eq, inArray, isNull, notInArray } from "drizzle-orm"
import { ICurrentUser } from "../../common/model/current-user.model"
import { BadRequestError } from "../../common/model/error.model"
import { Constant } from "../../config/constant/common.constant"
import { db } from "../../config/db/db"
import { ICreateParkingRecord, ParkingRecordSchema } from "../../config/db/schema/parking-record.schema"
import { ParkingSlotSchema } from "../../config/db/schema/parking-slot.schema"
import { VehicleSchema } from "../../config/db/schema/vehicle.schema"
import { UniqueId } from "../../utils/common.util"
import DateUtil from "../../utils/date.util"
import { ICreateParkingRecordDto, IUnparkVehicleDtoDto } from "./dto/parking-record.dto"

export const ParkingRecordService = {
    add: async (record: ICreateParkingRecordDto) => {
        // find available slot on that lot
        const blockedSlot = db
            .select({
                slotId: ParkingRecordSchema.slotId,
            })
            .from(ParkingRecordSchema)
            .where(and(eq(ParkingRecordSchema.lotId, record.lotId), isNull(ParkingRecordSchema.exitTime)))

        const availableSlot = await db
            .select({
                id: ParkingSlotSchema.id,
            })
            .from(ParkingSlotSchema)
            .where(and(notInArray(ParkingSlotSchema.id, blockedSlot)))
            .orderBy(asc(ParkingSlotSchema.id))

        if (availableSlot.length === 0) {
            throw new BadRequestError("No Slot available")
        }
        const id = UniqueId.createUlid()
        const recordObj: ICreateParkingRecord = {
            id,
            vehicleId: record.vehicleId,
            lotId: record.lotId,
            slotId: availableSlot[0].id,
        }
        await db.insert(ParkingRecordSchema).values(recordObj)
    },
    /**
     * get logged in user parked/ un-parked vehicle list
     * @param user
     * @returns
     */
    getParkedVehicleList: async (user: ICurrentUser) => {
        const allVehicles = db
            .select({ id: VehicleSchema.id })
            .from(VehicleSchema)
            .where(eq(VehicleSchema.userId, user.id))

        const list = await db
            .select()
            .from(ParkingRecordSchema)
            .where(inArray(ParkingRecordSchema.vehicleId, allVehicles))
        return list
    },
    unparkVehicle: async (unpark: IUnparkVehicleDtoDto) => {
        await db
            .update(ParkingRecordSchema)
            .set({
                exitTime: new Date(),
            })
            .where(and(eq(ParkingRecordSchema.id, unpark.id)))
        // now calculate the price
        const data = await db
            .select()
            .from(ParkingRecordSchema)
            .where(and(eq(ParkingRecordSchema.id, unpark.id)))

        const totalTime = DateUtil.roundTotalTime(data[0].entryTime, data[0].exitTime!)
        const totalPrice = totalTime * Constant.PER_HOUR_PRICE
        return {
            totalTime,
            totalPrice,
        }
    },
}
