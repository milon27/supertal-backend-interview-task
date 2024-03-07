import { createInsertSchema } from "drizzle-zod"
import { z } from "zod"
import { ParkingSlotSchema } from "../../../config/db/schema/parking-slot.schema"
import { ZodMin1UpdateRefine } from "../../../utils/zod.util"

// insert
export const CreateParkingSlotDto = createInsertSchema(ParkingSlotSchema).omit({
    id: true,
})
export type ICreateParkingSlotDto = z.infer<typeof CreateParkingSlotDto>

// update
export const UpdateParkingSlotDto = CreateParkingSlotDto.omit({
    lotId: true,
    createdAt: true,
})
    .partial()
    .refine(ZodMin1UpdateRefine, {
        message: "update least 1 property",
    })
export type IUpdateParkingSlotDto = z.infer<typeof UpdateParkingSlotDto>
