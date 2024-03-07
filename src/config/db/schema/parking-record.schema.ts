import { relations, sql } from "drizzle-orm"
import { datetime, mysqlTable, varchar } from "drizzle-orm/mysql-core"
import { ParkingLotSchema } from "./parking-lot.schema"
import { ParkingSlotSchema } from "./parking-slot.schema"
import { VehicleSchema } from "./vehicle.schema"

// 1 vehicle can be parked only in 1 slot at a time
export const ParkingRecordSchema = mysqlTable(
    "parking_record_table",
    {
        id: varchar("id", { length: 50 }).primaryKey(),
        lotId: varchar("lot_id", { length: 50 })
            .notNull()
            .references(() => ParkingLotSchema.id),
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
    }
    // (table) => {
    //     return {
    //         uqSlot: unique("uq_slot").on(table.slotId, table.vehicleId, table.exitTime),
    //         // uqVehicle: unique("uq_vehicle").on(table.vehicleId, table.exitTime),
    //     }
    // }
)

export type IParkingRecord = typeof ParkingRecordSchema.$inferSelect
export type ICreateParkingRecord = typeof ParkingRecordSchema.$inferInsert

// define relation
export const ParkingRecordRelation = relations(ParkingRecordSchema, ({ one }) => {
    return {
        lot: one(ParkingLotSchema, {
            fields: [ParkingRecordSchema.lotId],
            references: [ParkingLotSchema.id],
        }),
        slot: one(ParkingSlotSchema, {
            fields: [ParkingRecordSchema.lotId],
            references: [ParkingSlotSchema.id],
        }),
        vehicle: one(VehicleSchema, {
            fields: [ParkingRecordSchema.lotId],
            references: [VehicleSchema.id],
        }),
    }
})
