/*
  Warnings:

  - You are about to drop the column `serverId` on the `image` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Image_serverId_key` ON `image`;

-- AlterTable
ALTER TABLE `image` DROP COLUMN `serverId`;
