import { z } from "zod"
import { ZodSimpleString } from "../../../utils/zod.util"

// park a vehicle
export const CreateParkingRecordDto = z.object({
    lotId: ZodSimpleString,
    vehicleId: ZodSimpleString,
})
export type ICreateParkingRecordDto = z.infer<typeof CreateParkingRecordDto>

// unpark a vehicle
export const UnparkVehicleDto = z.object({
    id: ZodSimpleString,
})
export type IUnparkVehicleDtoDto = z.infer<typeof UnparkVehicleDto>
