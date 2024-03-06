import { sql } from "drizzle-orm"
import { boolean, datetime, mysqlTable, varchar } from "drizzle-orm/mysql-core"
import { UserSchema } from "./user.schema"

// 1 user (manager) can have many parking lot
export const ParkingLotSchema = mysqlTable("parking_lot_table", {
    id: varchar("id", { length: 50 }).primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    isAvailable: boolean("is_available").default(true),

    userId: varchar("user_id", { length: 50 })
        .notNull()
        .references(() => UserSchema.id),

    createdAt: datetime("created_at")
        .default(sql`(CURRENT_TIMESTAMP)`)
        .notNull(),
})

export type IParkingLot = typeof ParkingLotSchema.$inferSelect
// export type ICreateParkingLot = typeof ParkingLotSchema.$inferInsert
