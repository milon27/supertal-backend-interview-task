import { NextFunction, Request, Response } from "express"
import { IGetAllQueryParamDto } from "../../common/dto/params.dto"
import { StatusCode } from "../../config/constant/code.constant"
import { MyResponse } from "../../utils/my-response.util"
import { ICreateVehicleDto } from "./dto/vehicle.dto"
import { VehicleService } from "./vehicle.service"

export const VehicleController = {
    get: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { page, size } = req.query as IGetAllQueryParamDto
            const list = await VehicleService.getAll(Number(page), Number(size), req.user)
            return res.status(StatusCode.OK).json(MyResponse("operation successful", list))
        } catch (e) {
            return next(e)
        }
    },
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await VehicleService.add(req.body as ICreateVehicleDto, req.user)
            return res.status(StatusCode.OK).json(MyResponse("operation successful", true))
        } catch (e) {
            return next(e)
        }
    },
}
