import { ICurrentUser } from "../../../common/model/current-user.model"
import { ParkingLotService } from "../../../feature/parking-lot/parking-lot.service"
import { ParkingSlotService } from "../../../feature/parking-slot/parking-slot.service"
import { UserService } from "../../../feature/user/user.service"
import { Constant } from "../../constant/common.constant"
import { myLogger } from "../../logger"

export const runSeed = async () => {
    myLogger().info("seeding...")
    // create manager
    const userId = await UserService.createUser({
        fullName: "manager",
        email: "manager@gmail.com",
        password: "1234567",
        isSuperAdmin: true,
    })
    const user: ICurrentUser = {
        id: userId,
        isSuperAdmin: true,
        timeZone: Constant.TIMEZONE,
    }
    // create 2 lot
    const lot1 = await ParkingLotService.add(
        {
            title: "Lot 1",
        },
        user
    )
    const lot2 = await ParkingLotService.add(
        {
            title: "Lot 2",
        },
        user
    )
    // create 2 slot + 1 slot
    await ParkingSlotService.add({
        title: "Lot 1-Slot 1",
        lotId: lot1,
    })
    await ParkingSlotService.add({
        title: "Lot 1-Slot 2",
        lotId: lot1,
    })
    await ParkingSlotService.add({
        title: "Lot 2-Slot 1",
        lotId: lot2,
    })

    myLogger().info("Seed Done")
    process.exit(0)
}
// eslint-disable-next-line no-void
void runSeed()
