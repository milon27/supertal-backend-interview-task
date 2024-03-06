import { createInsertSchema } from "drizzle-zod"
import { z } from "zod"
import { ParkingSlotSchema } from "../../../config/db/schema/parking-slot.schema"

// insert
export const CreateParkingSlotDto = createInsertSchema(ParkingSlotSchema).omit({
    id: true,
})
export type ICreateParkingSlotDto = z.infer<typeof CreateParkingSlotDto>
