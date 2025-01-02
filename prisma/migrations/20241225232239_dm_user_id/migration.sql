/*
  Warnings:

  - You are about to drop the column `deleted` on the `directmessage` table. All the data in the column will be lost.
  - Added the required column `userId` to the `DirectMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `directmessage` DROP COLUMN `deleted`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `member` MODIFY `serverId` VARCHAR(191) NULL;
