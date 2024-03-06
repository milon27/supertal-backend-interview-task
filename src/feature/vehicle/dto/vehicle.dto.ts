import { createInsertSchema } from "drizzle-zod"
import { z } from "zod"
import { VehicleSchema } from "../../../config/db/schema/vehicle.schema"
import { ZodMin1UpdateRefine } from "../../../utils/zod.util"

// insert
export const CreateVehicleDto = createInsertSchema(VehicleSchema).omit({
    id: true,
    userId: true,
})
export type ICreateVehicleDto = z.infer<typeof CreateVehicleDto>

// update
export const UpdateVehicleDto = CreateVehicleDto.partial().refine(ZodMin1UpdateRefine, {
    message: "update least 1 property",
})
export type IUpdateVehicleDto = z.infer<typeof UpdateVehicleDto>
