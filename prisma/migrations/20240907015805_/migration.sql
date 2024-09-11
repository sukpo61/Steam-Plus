/*
  Warnings:

  - A unique constraint covering the columns `[serverId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Image_serverId_key` ON `Image`(`serverId`);
