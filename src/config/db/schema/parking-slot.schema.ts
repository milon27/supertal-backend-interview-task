import { relations, sql } from "drizzle-orm"
import { boolean, datetime, mysqlTable, varchar } from "drizzle-orm/mysql-core"
import { ParkingLotSchema } from "./parking-lot.schema"

// 1 parking lot can have many parking slot
export const ParkingSlotSchema = mysqlTable("parking_slot_table", {
    id: varchar("id", { length: 50 }).primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    isUnderMaintenance: boolean("is_under_maintenance").default(false),

    lotId: varchar("lot_id", { length: 50 })
        .notNull()
        .references(() => ParkingLotSchema.id),

    createdAt: datetime("created_at")
        .default(sql`(CURRENT_TIMESTAMP)`)
        .notNull(),
})

export type IParkingSlot = typeof ParkingSlotSchema.$inferSelect
export type ICreateParkingSlot = typeof ParkingSlotSchema.$inferInsert

// define relation
export const ParkingSlotRelation = relations(ParkingSlotSchema, ({ one }) => {
    return {
        lot: one(ParkingLotSchema, {
            fields: [ParkingSlotSchema.lotId],
            references: [ParkingLotSchema.id],
        }),
    }
})
