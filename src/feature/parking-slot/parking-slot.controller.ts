import { NextFunction, Request, Response } from "express"
import { IIdParamDto } from "../../common/dto/params.dto"
import { StatusCode } from "../../config/constant/code.constant"
import { MyResponse } from "../../utils/my-response.util"
import { ICreateParkingSlotDto, IUpdateParkingSlotDto } from "./dto/parking-slot.dto"
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
    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params as IIdParamDto
            await ParkingSlotService.update(id, req.body as IUpdateParkingSlotDto)
            return res.status(StatusCode.OK).json(MyResponse("operation successful", true))
        } catch (e) {
            return next(e)
        }
    },
}
