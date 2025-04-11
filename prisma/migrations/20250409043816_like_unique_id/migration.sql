/*
  Warnings:

  - A unique constraint covering the columns `[commentId,userId]` on the table `CommentLike` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[postId,userId]` on the table `PostLike` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `CommentLike_commentId_idx` ON `commentlike`;

-- DropIndex
DROP INDEX `CommentLike_userId_idx` ON `commentlike`;

-- DropIndex
DROP INDEX `PostLike_postId_idx` ON `postlike`;

-- DropIndex
DROP INDEX `PostLike_userId_idx` ON `postlike`;

-- CreateIndex
CREATE UNIQUE INDEX `CommentLike_commentId_userId_key` ON `CommentLike`(`commentId`, `userId`);

-- CreateIndex
CREATE UNIQUE INDEX `PostLike_postId_userId_key` ON `PostLike`(`postId`, `userId`);
