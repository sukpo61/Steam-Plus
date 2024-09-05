/*
  Warnings:

  - You are about to drop the column `channelId` on the `post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[appId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Post_channelId_idx` ON `post`;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `channelId`,
    ADD COLUMN `appId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Post_appId_key` ON `Post`(`appId`);

-- CreateIndex
CREATE INDEX `Post_appId_idx` ON `Post`(`appId`);
