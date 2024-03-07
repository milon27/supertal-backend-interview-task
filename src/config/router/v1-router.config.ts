import express from "express"
import AuthRouter from "../../feature/auth/auth.router"
import HealthCheckRouter from "../../feature/health-check/health-check.router"
import ParkingLotRouter from "../../feature/parking-lot/parking-lot.router"
import ParkingRecordRouter from "../../feature/parking-record/parking-record.router"
import ParkingSlotRouter from "../../feature/parking-slot/parking-slot.router"
import UserRouter from "../../feature/user/user.router"
import VehicleRouter from "../../feature/vehicle/vehicle.router"

const v1Router = express.Router()

v1Router.use(`/health`, HealthCheckRouter)
v1Router.use(`/auth`, AuthRouter)
v1Router.use(`/user`, UserRouter)
v1Router.use(`/vehicle`, VehicleRouter)
v1Router.use(`/parking-lot`, ParkingLotRouter)
v1Router.use(`/parking-slot`, ParkingSlotRouter)
v1Router.use(`/parking-record`, ParkingRecordRouter)

export default v1Router
