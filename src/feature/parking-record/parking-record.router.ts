import { Router } from "express"
import { AuthMid } from "../../middleware/auth.mid"
import { validateMid } from "../../middleware/validate.mid"
import { CreateParkingRecordDto } from "./dto/parking-record.dto"
import { ParkingRecordController } from "./parking-record.controller"

const ParkingRecordRouter = Router()

ParkingRecordRouter.use(AuthMid.isLoggedInMid)

/**
 * @manager
 * @description create a new parking-record
 * @url {{BASE_URL}}/parking-record/
 */
ParkingRecordRouter.post("/", validateMid({ body: CreateParkingRecordDto }), ParkingRecordController.create)

export default ParkingRecordRouter
