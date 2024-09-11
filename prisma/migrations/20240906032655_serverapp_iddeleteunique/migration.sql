/*
  Warnings:

  - Made the column `appId` on table `server` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Server_appId_key` ON `server`;

-- AlterTable
ALTER TABLE `server` MODIFY `appId` INTEGER NOT NULL;
