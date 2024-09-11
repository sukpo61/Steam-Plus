/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `server` table. All the data in the column will be lost.
  - You are about to drop the `likesonposts` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `server` DROP COLUMN `imageUrl`;

-- DropTable
DROP TABLE `likesonposts`;

-- CreateTable
CREATE TABLE `Like` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `postId` VARCHAR(191) NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Like_userId_idx`(`userId`),
    INDEX `Like_postId_idx`(`postId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
