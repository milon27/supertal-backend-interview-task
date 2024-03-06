import { sql } from "drizzle-orm"
import { datetime, mysqlTable, varchar } from "drizzle-orm/mysql-core"
import { ParkingSlotSchema } from "./parking-slot.schema"
import { VehicleSchema } from "./vehicle.schema"

// 1 vehicle can be parked only in 1 slot at a time
export const ParkingRecordSchema = mysqlTable("parking_record_table", {
    slotId: varchar("slot_id", { length: 50 })
        .notNull()
        .references(() => ParkingSlotSchema.id),
    vehicleId: varchar("vehicle_id", { length: 50 })
        .notNull()
        .references(() => VehicleSchema.id),
    entryTime: datetime("entry_time")
        .default(sql`(CURRENT_TIMESTAMP)`)
        .notNull(),
    exitTime: datetime("exit_time"), // null means still on parked

    createdAt: datetime("created_at")
        .default(sql`(CURRENT_TIMESTAMP)`)
        .notNull(),
})

export type IParkingRecord = typeof ParkingRecordSchema.$inferSelect
export type ICreateParkingRecord = typeof ParkingRecordSchema.$inferInsert
