import { Router } from "express"
import { GetAllQueryParamDto } from "../../common/dto/params.dto"
import { AuthMid } from "../../middleware/auth.mid"
import { validateMid } from "../../middleware/validate.mid"
import { CreateVehicleDto } from "./dto/vehicle.dto"
import { VehicleController } from "./vehicle.controller"

const VehicleRouter = Router()

VehicleRouter.use(AuthMid.isLoggedInMid)

/**
 * @description get all vehicle of logged in user
 * @url {{BASE_URL}}/v1/vehicle/?page=1
 */
VehicleRouter.get("/", validateMid({ query: GetAllQueryParamDto }), VehicleController.get)

/**
 * @description create a new vehicle
 * @url {{BASE_URL}}/v1/vehicle/
 */
VehicleRouter.post("/", validateMid({ body: CreateVehicleDto }), VehicleController.create)

export default VehicleRouter
