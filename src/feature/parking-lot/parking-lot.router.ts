import { Router } from "express"
import { IdParamDto } from "../../common/dto/params.dto"
import { AuthMid } from "../../middleware/auth.mid"
import { validateMid } from "../../middleware/validate.mid"
import { CreateParkingLotDto } from "./dto/parking-lot.dto"
import { ParkingLotController } from "./parking-lot.controller"

const ParkingLotRouter = Router()

ParkingLotRouter.use(AuthMid.isLoggedInMid)

/**
 * @manager
 * @description get parking-slot status filter by lot id
 * @url {{BASE_URL}}/parking-slot/:id
 */
ParkingLotRouter.get(
    "/:id",
    AuthMid.isSuperAdmin,
    validateMid({ params: IdParamDto }),
    ParkingLotController.getSingleLot
)

/**
 * @manager
 * @description create a new parking-lot
 * @url {{BASE_URL}}/v1/parking-lot/
 */
ParkingLotRouter.post(
    "/",
    AuthMid.isSuperAdmin,
    validateMid({ body: CreateParkingLotDto }),
    ParkingLotController.createParkingLot
)

export default ParkingLotRouter
