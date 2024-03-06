import { desc } from "drizzle-orm"
import { ICurrentUser } from "../../common/model/current-user.model"
import { db } from "../../config/db/db"
import { ParkingLotSchema } from "../../config/db/schema/parking-lot.schema"
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
    add: async (lot: ICreateParkingLotDto, user: ICurrentUser) => {
        const id = UniqueId.createUlid()
        await db.insert(ParkingLotSchema).values({ id, userId: user.id, ...lot })
    },
}
