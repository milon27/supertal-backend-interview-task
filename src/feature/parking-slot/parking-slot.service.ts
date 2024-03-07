import { eq } from "drizzle-orm"
import { BadRequestError } from "../../common/model/error.model"
import { db } from "../../config/db/db"
import { ParkingSlotSchema } from "../../config/db/schema/parking-slot.schema"
import { UniqueId } from "../../utils/common.util"
import { ICreateParkingSlotDto, IUpdateParkingSlotDto } from "./dto/parking-slot.dto"

export const ParkingSlotService = {
    add: async (slot: ICreateParkingSlotDto) => {
        const id = UniqueId.createUlid()
        await db.insert(ParkingSlotSchema).values({ id, ...slot })
    },
    update: async (id: string, slot: IUpdateParkingSlotDto) => {
        const result = await db.update(ParkingSlotSchema).set(slot).where(eq(ParkingSlotSchema.id, id))
        if (result[0].affectedRows === 0) {
            throw new BadRequestError("Invalid Id")
        }
    },
}
