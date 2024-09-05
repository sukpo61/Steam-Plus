/*
  Warnings:

  - Added the required column `channelId` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `viewCount` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `profile` ADD COLUMN `channelId` VARCHAR(191) NOT NULL;
