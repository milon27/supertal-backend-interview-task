CREATE TABLE `parking_lot_table` (
	`id` varchar(50) NOT NULL,
	`title` varchar(255) NOT NULL,
	`is_available` boolean DEFAULT true,
	`user_id` varchar(50) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `parking_lot_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `parking_record_table` (
	`id` varchar(50) NOT NULL,
	`lot_id` varchar(50) NOT NULL,
	`slot_id` varchar(50) NOT NULL,
	`vehicle_id` varchar(50) NOT NULL,
	`entry_time` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`exit_time` datetime,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `parking_record_table_id` PRIMARY KEY(`id`),
	CONSTRAINT `uq` UNIQUE(`slot_id`,`vehicle_id`,`exit_time`)
);
--> statement-breakpoint
CREATE TABLE `parking_slot_table` (
	`id` varchar(50) NOT NULL,
	`title` varchar(255) NOT NULL,
	`is_under_maintenance` boolean DEFAULT false,
	`lot_id` varchar(50) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `parking_slot_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_table` (
	`id` varchar(50) NOT NULL,
	`full_name` varchar(255) NOT NULL,
	`phone` varchar(20),
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`gender` enum('male','female') NOT NULL DEFAULT 'male',
	`avatar` varchar(255),
	`is_email_verified` boolean NOT NULL DEFAULT false,
	`is_super_admin` boolean NOT NULL DEFAULT false,
	`country_code` varchar(5) NOT NULL DEFAULT 'BD',
	`city` varchar(50),
	`state` varchar(50),
	`zip_code` varchar(50),
	`address` varchar(255),
	`time_zone` varchar(50) NOT NULL DEFAULT 'Asia/Dhaka',
	`fcm_token` varchar(255),
	`last_logged_in` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `user_table_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_table_phone_unique` UNIQUE(`phone`),
	CONSTRAINT `user_table_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `vehicle_table` (
	`id` varchar(50) NOT NULL,
	`title` varchar(255) NOT NULL,
	`registration_number` varchar(50),
	`user_id` varchar(50) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `vehicle_table_id` PRIMARY KEY(`id`),
	CONSTRAINT `vehicle_table_registration_number_unique` UNIQUE(`registration_number`)
);
--> statement-breakpoint
ALTER TABLE `parking_lot_table` ADD CONSTRAINT `parking_lot_table_user_id_user_table_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user_table`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `parking_record_table` ADD CONSTRAINT `parking_record_table_lot_id_parking_lot_table_id_fk` FOREIGN KEY (`lot_id`) REFERENCES `parking_lot_table`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `parking_record_table` ADD CONSTRAINT `parking_record_table_slot_id_parking_slot_table_id_fk` FOREIGN KEY (`slot_id`) REFERENCES `parking_slot_table`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `parking_record_table` ADD CONSTRAINT `parking_record_table_vehicle_id_vehicle_table_id_fk` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicle_table`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `parking_slot_table` ADD CONSTRAINT `parking_slot_table_lot_id_parking_lot_table_id_fk` FOREIGN KEY (`lot_id`) REFERENCES `parking_lot_table`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `vehicle_table` ADD CONSTRAINT `vehicle_table_user_id_user_table_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user_table`(`id`) ON DELETE no action ON UPDATE no action;