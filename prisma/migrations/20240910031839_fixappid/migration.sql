/*
  Warnings:

  - The primary key for the `app` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `app` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `appId` on the `server` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `app` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `server` MODIFY `appId` INTEGER NOT NULL;
