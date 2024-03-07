import { NextFunction, Request, Response } from "express"
import { StatusCode } from "../../config/constant/code.constant"
import { MyResponse } from "../../utils/my-response.util"
import { ICreateParkingRecordDto, IUnparkVehicleDtoDto } from "./dto/parking-record.dto"
import { ParkingRecordService } from "./parking-record.service"

export const ParkingRecordController = {
    getParkedVehicleList: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const list = await ParkingRecordService.getParkedVehicleList(req.user)
            return res.status(StatusCode.OK).json(MyResponse("operation successful", list))
        } catch (e) {
            return next(e)
        }
    },
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await ParkingRecordService.add(req.body as ICreateParkingRecordDto)
            return res.status(StatusCode.OK).json(MyResponse("operation successful", true))
        } catch (e) {
            return next(e)
        }
    },
    unpark: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await ParkingRecordService.unparkVehicle(req.body as IUnparkVehicleDtoDto)
            return res.status(StatusCode.OK).json(MyResponse("operation successful", data))
        } catch (e) {
            return next(e)
        }
    },
}
