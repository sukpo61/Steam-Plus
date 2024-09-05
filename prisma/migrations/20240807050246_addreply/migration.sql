/*
  Warnings:

  - You are about to drop the column `images` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `comment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[parentId]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[commentId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `commentId` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comment` DROP COLUMN `images`,
    DROP COLUMN `profileId`,
    ADD COLUMN `parentId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `image` ADD COLUMN `commentId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Comment_parentId_key` ON `Comment`(`parentId`);

-- CreateIndex
CREATE INDEX `Comment_parentId_idx` ON `Comment`(`parentId`);

-- CreateIndex
CREATE INDEX `Comment_postId_idx` ON `Comment`(`postId`);

-- CreateIndex
CREATE UNIQUE INDEX `Image_commentId_key` ON `Image`(`commentId`);

-- CreateIndex
CREATE INDEX `Image_commentId_idx` ON `Image`(`commentId`);

-- CreateIndex
CREATE INDEX `Image_postId_idx` ON `Image`(`postId`);

-- CreateIndex
CREATE INDEX `Post_channelId_idx` ON `Post`(`channelId`);
