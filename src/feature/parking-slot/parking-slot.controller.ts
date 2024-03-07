import { NextFunction, Request, Response } from "express"
import { StatusCode } from "../../config/constant/code.constant"
import { MyResponse } from "../../utils/my-response.util"
import { ICreateParkingSlotDto } from "./dto/parking-slot.dto"
import { ParkingSlotService } from "./parking-slot.service"

export const ParkingSlotController = {
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await ParkingSlotService.add(req.body as ICreateParkingSlotDto)
            return res.status(StatusCode.OK).json(MyResponse("operation successful", true))
        } catch (e) {
            return next(e)
        }
    },
}
