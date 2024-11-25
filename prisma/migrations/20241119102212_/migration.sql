/*
  Warnings:

  - You are about to drop the column `default` on the `channel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `channel` DROP COLUMN `default`,
    ADD COLUMN `isDefault` BOOLEAN NOT NULL DEFAULT false;
