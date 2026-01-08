CREATE TABLE `attendees` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`source` text DEFAULT 'wedding_hero' NOT NULL,
	`user_agent` text,
	`referrer` text,
	`created_at` text NOT NULL
);
