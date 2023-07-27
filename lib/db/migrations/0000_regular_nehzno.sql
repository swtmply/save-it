CREATE TABLE `account` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`type` enum('income','expense') NOT NULL DEFAULT 'income',
	`category` text,
	`amount` decimal(10,2) NOT NULL DEFAULT '0',
	`date` timestamp,
	`userId` varchar(191) NOT NULL,
	CONSTRAINT `account_id` PRIMARY KEY(`id`)
);
