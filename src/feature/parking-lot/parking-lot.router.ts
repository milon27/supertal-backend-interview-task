import { Router } from "express"
import { AuthMid } from "../../middleware/auth.mid"
import { validateMid } from "../../middleware/validate.mid"
import { CreateParkingLotDto } from "./dto/parking-lot.dto"
import { ParkingLotController } from "./parking-lot.controller"

const ParkingLotRouter = Router()

ParkingLotRouter.use(AuthMid.isLoggedInMid)

/**
 * @manager
 * @description create a new parking-lot
 * @url {{BASE_URL}}/parking-lot/
 */
ParkingLotRouter.post(
    "/",
    AuthMid.isSuperAdmin,
    validateMid({ body: CreateParkingLotDto }),
    ParkingLotController.createParkingLot
)

export default ParkingLotRouter
