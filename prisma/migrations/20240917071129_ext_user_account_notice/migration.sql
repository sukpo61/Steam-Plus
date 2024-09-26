/*
  Warnings:

  - Added the required column `userId` to the `App` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `app` ADD COLUMN `ext_user_account_notice` TEXT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;
