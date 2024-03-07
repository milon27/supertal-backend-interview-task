import { relations, sql } from "drizzle-orm"
import { datetime, mysqlTable, varchar } from "drizzle-orm/mysql-core"
import { ParkingRecordSchema } from "./parking-record.schema"
import { UserSchema } from "./user.schema"

//  1 user can have many vehicle
export const VehicleSchema = mysqlTable("vehicle_table", {
    id: varchar("id", { length: 50 }).primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    registrationNumber: varchar("registration_number", { length: 50 }).notNull().unique(),

    userId: varchar("user_id", { length: 50 })
        .notNull()
        .references(() => UserSchema.id),

    createdAt: datetime("created_at")
        .default(sql`(CURRENT_TIMESTAMP)`)
        .notNull(),
})

export type IVehicle = typeof VehicleSchema.$inferSelect
export type ICreateVehicle = typeof VehicleSchema.$inferInsert

// define relation
export const VehicleRelation = relations(VehicleSchema, ({ many }) => {
    return {
        records: many(ParkingRecordSchema),
    }
})
