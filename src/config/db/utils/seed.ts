import { UserService } from "../../../feature/user/user.service"
import { myLogger } from "../../logger"

export const runSeed = async () => {
    myLogger().info("seeding...")
    // create manager
    await UserService.createUser({
        fullName: "manager",
        email: "manager@gmail.com",
        password: "1234567",
        isSuperAdmin: true,
    })
    myLogger().info("Seed Done")
    process.exit(0)
}
// eslint-disable-next-line no-void
void runSeed()
