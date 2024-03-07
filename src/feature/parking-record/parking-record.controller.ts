import { NextFunction, Request, Response } from "express"
import { StatusCode } from "../../config/constant/code.constant"
import { MyResponse } from "../../utils/my-response.util"
import { ICreateParkingRecordDto } from "./dto/parking-record.dto"
import { ParkingRecordService } from "./parking-record.service"

export const ParkingRecordController = {
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await ParkingRecordService.add(req.body as ICreateParkingRecordDto)
            return res.status(StatusCode.OK).json(MyResponse("operation successful", true))
        } catch (e) {
            return next(e)
        }
    },
}
