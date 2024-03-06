import { drizzle } from "drizzle-orm/mysql2"
import mysql from "mysql2/promise"
import { EnvConfig } from "../env.config"

import * as parkingLot from "./schema/parking-lot.schema"
import * as parkingRecord from "./schema/parking-record.schema"
import * as parkingSlot from "./schema/parking-slot.schema"
import * as user from "./schema/user.schema"
import * as vehicle from "./schema/vehicle.schema"

const schemas = {
    ...user,
    ...vehicle,
    ...parkingLot,
    ...parkingSlot,
    ...parkingRecord,
}

export const dbPool = mysql.createPool({
    uri: EnvConfig.DATABASE_URL,
})

// use only in services
export const db = drizzle(dbPool, {
    schema: schemas,
    logger: false,
    mode: "default",
})

export type IDb = typeof db
