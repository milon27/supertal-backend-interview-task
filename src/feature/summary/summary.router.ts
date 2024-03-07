import { Router } from "express"
import { AuthMid } from "../../middleware/auth.mid"
import { SummaryController } from "./summary.controller"

const SummaryRouter = Router()

SummaryRouter.use(AuthMid.isSuperAdmin)

/**
 * @manger
 * @description get all summary
 * @url {{BASE_URL}}/v1/summary/
 */
SummaryRouter.get("/", SummaryController.get)

export default SummaryRouter
