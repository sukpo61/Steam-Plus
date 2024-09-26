/*
  Warnings:

  - A unique constraint covering the columns `[appId,userId]` on the table `Library` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Library_appId_idx` ON `library`;

-- DropIndex
DROP INDEX `Library_userId_idx` ON `library`;

-- CreateIndex
CREATE UNIQUE INDEX `Library_appId_userId_key` ON `Library`(`appId`, `userId`);
