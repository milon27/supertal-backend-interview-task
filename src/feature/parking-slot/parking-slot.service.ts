import { db } from "../../config/db/db"
import { ParkingSlotSchema } from "../../config/db/schema/parking-slot.schema"
import { UniqueId } from "../../utils/common.util"
import { ICreateParkingSlotDto } from "./dto/parking-slot.dto"

export const ParkingSlotService = {
    add: async (slot: ICreateParkingSlotDto) => {
        const id = UniqueId.createUlid()
        await db.insert(ParkingSlotSchema).values({ id, ...slot })
    },
}
