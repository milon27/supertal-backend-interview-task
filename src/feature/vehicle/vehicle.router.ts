import { Router } from "express"
import { AuthMid } from "../../middleware/auth.mid"
import { validateMid } from "../../middleware/validate.mid"
import { CreateVehicleDto } from "./dto/vehicle.dto"
import { VehicleController } from "./vehicle.controller"

const VehicleRouter = Router()

VehicleRouter.use(AuthMid.isLoggedInMid)

/**
 * @manager
 * @description create a new vehicle
 * @url {{BASE_URL}}/vehicle/
 */
VehicleRouter.post("/", validateMid({ body: CreateVehicleDto }), VehicleController.create)

export default VehicleRouter
