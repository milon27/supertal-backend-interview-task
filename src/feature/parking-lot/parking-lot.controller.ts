import { NextFunction, Request, Response } from "express"
import { StatusCode } from "../../config/constant/code.constant"
import { MyResponse } from "../../utils/my-response.util"
import { ICreateParkingLotDto } from "./dto/parking-lot.dto"
import { ParkingLotService } from "./parking-lot.service"

export const ParkingLotController = {
    createParkingLot: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await ParkingLotService.add(req.body as ICreateParkingLotDto, req.user)
            return res.status(StatusCode.OK).json(MyResponse("operation successful", true))
        } catch (e) {
            return next(e)
        }
    },
}
