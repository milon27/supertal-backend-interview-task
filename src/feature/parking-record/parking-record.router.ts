import { Router } from "express"
import { AuthMid } from "../../middleware/auth.mid"
import { validateMid } from "../../middleware/validate.mid"
import { CreateParkingRecordDto, UnparkVehicleDto } from "./dto/parking-record.dto"
import { ParkingRecordController } from "./parking-record.controller"

const ParkingRecordRouter = Router()

ParkingRecordRouter.use(AuthMid.isLoggedInMid)

/**
 * @description get logged in user parked/ un-parked vehicle list
 * @url {{BASE_URL}}/v1/parking-record/
 */
ParkingRecordRouter.get("/", ParkingRecordController.getParkedVehicleList)

/**
 * @description create a new parking-record
 * @url {{BASE_URL}}/v1/parking-record/
 */
ParkingRecordRouter.post("/", validateMid({ body: CreateParkingRecordDto }), ParkingRecordController.create)

/**
 * @description unpark
 * @url {{BASE_URL}}/v1/parking-record/
 */
ParkingRecordRouter.put("/", validateMid({ body: UnparkVehicleDto }), ParkingRecordController.unpark)

export default ParkingRecordRouter
