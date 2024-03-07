import { Router } from "express"
import { IdParamDto } from "../../common/dto/params.dto"
import { AuthMid } from "../../middleware/auth.mid"
import { validateMid } from "../../middleware/validate.mid"
import { CreateParkingSlotDto, UpdateParkingSlotDto } from "./dto/parking-slot.dto"
import { ParkingSlotController } from "./parking-slot.controller"

const ParkingSlotRouter = Router()

ParkingSlotRouter.use(AuthMid.isLoggedInMid)

/**
 * @manager
 * @description create a new parking-slot
 * @url {{BASE_URL}}/v1/parking-slot/
 */
ParkingSlotRouter.post(
    "/",
    AuthMid.isSuperAdmin,
    validateMid({ body: CreateParkingSlotDto }),
    ParkingSlotController.create
)

/**
 * @manager
 * @description update parking-slot
 * @url {{BASE_URL}}/v1/parking-slot/:id
 */
ParkingSlotRouter.put(
    "/:id",
    AuthMid.isSuperAdmin,
    validateMid({ params: IdParamDto, body: UpdateParkingSlotDto }),
    ParkingSlotController.update
)

export default ParkingSlotRouter
