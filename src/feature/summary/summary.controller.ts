import { NextFunction, Request, Response } from "express"
import { BadRequestError } from "../../common/model/error.model"
import { StatusCode } from "../../config/constant/code.constant"
import { MyResponse } from "../../utils/my-response.util"
import { SummaryService } from "./summary.service"

export const SummaryController = {
    get: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { date } = req.query // UTC Date = 2024-03-07T08:55:26.516Z
            if (!date) {
                throw new BadRequestError("Specify a date in utc format")
            }
            const result = await SummaryService.get(date as string, req.user)
            return res.status(StatusCode.OK).json(MyResponse("operation successful", result))
        } catch (e) {
            return next(e)
        }
    },
}
