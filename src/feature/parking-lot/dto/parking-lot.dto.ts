import { createInsertSchema } from "drizzle-zod"
import { z } from "zod"
import { ParkingLotSchema } from "../../../config/db/schema/parking-lot.schema"

// insert
export const CreateParkingLotDto = createInsertSchema(ParkingLotSchema).omit({
    id: true,
    userId: true,
})
export type ICreateParkingLotDto = z.infer<typeof CreateParkingLotDto>
