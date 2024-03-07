import { desc, eq, isNull } from "drizzle-orm"
import { ICurrentUser } from "../../common/model/current-user.model"
import { db } from "../../config/db/db"
import { ParkingLotSchema } from "../../config/db/schema/parking-lot.schema"
import { ParkingRecordSchema } from "../../config/db/schema/parking-record.schema"
import { ParkingSlotSchema } from "../../config/db/schema/parking-slot.schema"
import { CommonUtil, UniqueId } from "../../utils/common.util"
import { ICreateParkingLotDto } from "./dto/parking-lot.dto"

export const ParkingLotService = {
    /**
     * get all parking lot
     */
    getAll: async (page: number, pageSize: number) => {
        const { limit, offset } = CommonUtil.getLimitOffset(page, pageSize)

        const list = await db
            .select()
            .from(ParkingLotSchema)
            // .where(eq(ParkingLotSchema.userId, managerId)) // maybe in future if we want multiple manager
            .orderBy(desc(ParkingLotSchema.createdAt))
            .limit(limit)
            .offset(offset)

        return list
    },
    /**
     * get logged in manager lot status (which cars are parked in which slots)
     * @param user
     * @returns
     */
    getSingleLot: async (lotId: string) => {
        const list = await db.query.ParkingSlotSchema.findMany({
            with: {
                records: {
                    with: {
                        slot: true,
                        vehicle: true,
                    },
                    where: isNull(ParkingRecordSchema.exitTime), // only show which slot are available + currently booked
                },
            },
            where: eq(ParkingSlotSchema.lotId, lotId),
        })

        return list
    },
    add: async (lot: ICreateParkingLotDto, user: ICurrentUser) => {
        const id = UniqueId.createUlid()
        await db.insert(ParkingLotSchema).values({ id, userId: user.id, ...lot })
        // .onDuplicateKeyUpdate({ set: { id: sql`id` } })
        return id
    },
}
