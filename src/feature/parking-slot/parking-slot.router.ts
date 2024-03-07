import { Router } from "express"
import { AuthMid } from "../../middleware/auth.mid"
import { validateMid } from "../../middleware/validate.mid"
import { CreateParkingSlotDto } from "./dto/parking-slot.dto"
import { ParkingSlotController } from "./parking-slot.controller"

const ParkingSlotRouter = Router()

ParkingSlotRouter.use(AuthMid.isLoggedInMid)

/**
 * @manager
 * @description create a new parking-slot
 * @url {{BASE_URL}}/parking-slot/
 */
ParkingSlotRouter.post(
    "/",
    AuthMid.isSuperAdmin,
    validateMid({ body: CreateParkingSlotDto }),
    ParkingSlotController.create
)

export default ParkingSlotRouter
