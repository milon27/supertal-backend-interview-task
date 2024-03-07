import { NextFunction, Request, Response } from "express"
import { StatusCode } from "../../config/constant/code.constant"
import { MyResponse } from "../../utils/my-response.util"
import { ICreateVehicleDto } from "./dto/vehicle.dto"
import { VehicleService } from "./vehicle.service"

export const VehicleController = {
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await VehicleService.add(req.body as ICreateVehicleDto, req.user)
            return res.status(StatusCode.OK).json(MyResponse("operation successful", true))
        } catch (e) {
            return next(e)
        }
    },
}
