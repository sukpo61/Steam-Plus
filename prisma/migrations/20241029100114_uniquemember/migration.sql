/*
  Warnings:

  - A unique constraint covering the columns `[userId,serverId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Member_serverId_idx` ON `member`;

-- DropIndex
DROP INDEX `Member_userId_idx` ON `member`;

-- CreateIndex
CREATE UNIQUE INDEX `Member_userId_serverId_key` ON `Member`(`userId`, `serverId`);
