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
        // *check if vehicle is already parked
        const alreadyParked = await db
            .select()
            .from(ParkingRecordSchema)
            .where(and(eq(ParkingRecordSchema.vehicleId, record.vehicleId), isNull(ParkingRecordSchema.exitTime)))

        if (alreadyParked.length > 0) {
            throw new BadRequestError("Vehicle Already Parked")
        }

        // * find available slot on that lot (which is not already booked or not in maintenance mode)
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
            .where(
                and(
                    notInArray(ParkingSlotSchema.id, blockedSlot),
                    eq(ParkingSlotSchema.isUnderMaintenance, false),
                    eq(ParkingSlotSchema.lotId, record.lotId)
                )
            )
            .orderBy(asc(ParkingSlotSchema.id))

        if (availableSlot.length === 0) {
            throw new BadRequestError("No Slot available")
        }
        // * insert
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

        const list = await db.query.ParkingRecordSchema.findMany({
            with: {
                vehicle: true,
                slot: true,
            },
            where: inArray(ParkingRecordSchema.vehicleId, allVehicles),
        })

        return list
    },
    unparkVehicle: async (unpark: IUnparkVehicleDtoDto) => {
        const result = await db
            .update(ParkingRecordSchema)
            .set({
                exitTime: new Date(),
            })
            .where(and(eq(ParkingRecordSchema.id, unpark.id), isNull(ParkingRecordSchema.exitTime)))

        // check if there is anything to update
        if (result[0].affectedRows === 0) {
            throw new BadRequestError("Vehicle is already un-parked")
        }
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
