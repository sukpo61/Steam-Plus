/*
  Warnings:

  - A unique constraint covering the columns `[memberId,channelId]` on the table `Message` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Message_channelId_idx` ON `message`;

-- DropIndex
DROP INDEX `Message_memberId_idx` ON `message`;

-- CreateIndex
CREATE UNIQUE INDEX `Message_memberId_channelId_key` ON `Message`(`memberId`, `channelId`);
