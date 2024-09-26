/*
  Warnings:

  - You are about to drop the column `userId` on the `app` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `app` DROP COLUMN `userId`;

-- CreateTable
CREATE TABLE `Library` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `appId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Library_userId_idx`(`userId`),
    INDEX `Library_appId_idx`(`appId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
