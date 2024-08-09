-- DropIndex
DROP INDEX `Comment_parentId_key` ON `comment`;

-- DropIndex
DROP INDEX `Image_commentId_key` ON `image`;

-- AlterTable
ALTER TABLE `image` MODIFY `postId` VARCHAR(191) NULL,
    MODIFY `commentId` VARCHAR(191) NULL;
