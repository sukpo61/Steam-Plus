/*
  Warnings:

  - The `required_age` column on the `app` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `app` DROP COLUMN `required_age`,
    ADD COLUMN `required_age` JSON NULL;
