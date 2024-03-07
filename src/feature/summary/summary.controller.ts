import { NextFunction, Request, Response } from "express"
import { StatusCode } from "../../config/constant/code.constant"
import { MyResponse } from "../../utils/my-response.util"
import { SummaryService } from "./summary.service"

export const SummaryController = {
    get: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await SummaryService.get()
            return res.status(StatusCode.OK).json(MyResponse("operation successful", result))
        } catch (e) {
            return next(e)
        }
    },
}
