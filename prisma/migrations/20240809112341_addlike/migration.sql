-- AlterTable
ALTER TABLE `post` ADD COLUMN `profileId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `LikesOnPosts` (
    `postId` VARCHAR(191) NOT NULL,
    `profileId` VARCHAR(191) NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`postId`, `profileId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
