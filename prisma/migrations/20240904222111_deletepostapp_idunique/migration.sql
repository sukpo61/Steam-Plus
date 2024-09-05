/*
  Warnings:

  - Made the column `appId` on table `post` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Post_appId_key` ON `post`;

-- AlterTable
ALTER TABLE `post` MODIFY `appId` INTEGER NOT NULL;
