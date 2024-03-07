import { NextFunction, Request, Response } from "express"
import { IIdParamDto } from "../../common/dto/params.dto"
import { StatusCode } from "../../config/constant/code.constant"
import { MyResponse } from "../../utils/my-response.util"
import { ICreateParkingLotDto } from "./dto/parking-lot.dto"
import { ParkingLotService } from "./parking-lot.service"

export const ParkingLotController = {
    getSingleLot: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id: lotId } = req.params as IIdParamDto
            const list = await ParkingLotService.getSingleLot(lotId)
            return res.status(StatusCode.OK).json(MyResponse("operation successful", list))
        } catch (e) {
            return next(e)
        }
    },
    createParkingLot: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await ParkingLotService.add(req.body as ICreateParkingLotDto, req.user)
            return res.status(StatusCode.OK).json(MyResponse("operation successful", true))
        } catch (e) {
            return next(e)
        }
    },
}
