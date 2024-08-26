/*
  Warnings:

  - The primary key for the `likesonposts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `profileId` on the `likesonposts` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `post` table. All the data in the column will be lost.
  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[appId]` on the table `Community` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `LikesOnPosts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `community` ADD COLUMN `appId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `likesonposts` DROP PRIMARY KEY,
    DROP COLUMN `profileId`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`postId`, `userId`);

-- AlterTable
ALTER TABLE `post` DROP COLUMN `profileId`,
    ADD COLUMN `userId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `profile`;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `steamId` VARCHAR(191) NOT NULL,
    `channelId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_steamId_key`(`steamId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RefreshToken` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Community_appId_key` ON `Community`(`appId`);
