import { desc, eq } from "drizzle-orm"
import { ICurrentUser } from "../../common/model/current-user.model"
import { db } from "../../config/db/db"
import { VehicleSchema } from "../../config/db/schema/vehicle.schema"
import { CommonUtil, UniqueId } from "../../utils/common.util"
import { ICreateVehicleDto, IUpdateVehicleDto } from "./dto/vehicle.dto"

export const VehicleService = {
    /**
     * get all vehicle for logged in user
     */
    getAll: async (page: number, pageSize: number, user: ICurrentUser) => {
        const { limit, offset } = CommonUtil.getLimitOffset(page, pageSize)

        const list = await db
            .select()
            .from(VehicleSchema)
            .where(eq(VehicleSchema.userId, user.id))
            .orderBy(desc(VehicleSchema.createdAt))
            .limit(limit)
            .offset(offset)

        return list
    },
    add: async (vehicle: ICreateVehicleDto, user: ICurrentUser) => {
        const id = UniqueId.createUlid()
        await db.insert(VehicleSchema).values({ id, userId: user.id, ...vehicle })
    },
    update: async (id: string, lesson: IUpdateVehicleDto) => {
        await db.update(VehicleSchema).set(lesson).where(eq(VehicleSchema.id, id))
    },
    delete: async (id: string) => {
        await db.delete(VehicleSchema).where(eq(VehicleSchema.id, id))
    },
}
