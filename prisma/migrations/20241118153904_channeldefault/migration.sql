/*
  Warnings:

  - Added the required column `default` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `channel` ADD COLUMN `default` BOOLEAN NOT NULL;
