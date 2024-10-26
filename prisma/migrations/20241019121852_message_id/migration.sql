-- DropIndex
DROP INDEX `Message_memberId_channelId_key` ON `message`;

-- CreateIndex
CREATE INDEX `Message_channelId_idx` ON `Message`(`channelId`);

-- CreateIndex
CREATE INDEX `Message_memberId_idx` ON `Message`(`memberId`);
