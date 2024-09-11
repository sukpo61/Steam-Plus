/*
  Warnings:

  - You are about to drop the column `data` on the `app` table. All the data in the column will be lost.
  - Added the required column `about_the_game` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `achievements` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `background` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `background_raw` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capsule_image` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capsule_imagev5` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categories` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content_descriptors` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `controller_support` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `developers` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genres` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `header_image` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_free` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linux_requirements` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mac_requirements` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metacritic` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movies` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `package_groups` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `packages` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pc_requirements` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platforms` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posted_description` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_overview` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publishers` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ratings` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recommendations` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `release_date` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `required_age` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `screenshots` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `short_description` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `steam_appid` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `support_info` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supported_languages` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `App` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `app` DROP COLUMN `data`,
    ADD COLUMN `about_the_game` VARCHAR(191) NOT NULL,
    ADD COLUMN `achievements` JSON NOT NULL,
    ADD COLUMN `background` VARCHAR(191) NOT NULL,
    ADD COLUMN `background_raw` VARCHAR(191) NOT NULL,
    ADD COLUMN `capsule_image` VARCHAR(191) NOT NULL,
    ADD COLUMN `capsule_imagev5` VARCHAR(191) NOT NULL,
    ADD COLUMN `categories` JSON NOT NULL,
    ADD COLUMN `content_descriptors` JSON NOT NULL,
    ADD COLUMN `controller_support` VARCHAR(191) NOT NULL,
    ADD COLUMN `developers` JSON NOT NULL,
    ADD COLUMN `genres` JSON NOT NULL,
    ADD COLUMN `header_image` VARCHAR(191) NOT NULL,
    ADD COLUMN `is_free` BOOLEAN NOT NULL,
    ADD COLUMN `linux_requirements` JSON NOT NULL,
    ADD COLUMN `mac_requirements` JSON NOT NULL,
    ADD COLUMN `metacritic` JSON NOT NULL,
    ADD COLUMN `movies` JSON NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `package_groups` JSON NOT NULL,
    ADD COLUMN `packages` JSON NOT NULL,
    ADD COLUMN `pc_requirements` JSON NOT NULL,
    ADD COLUMN `platforms` JSON NOT NULL,
    ADD COLUMN `posted_description` VARCHAR(191) NOT NULL,
    ADD COLUMN `price_overview` JSON NOT NULL,
    ADD COLUMN `publishers` JSON NOT NULL,
    ADD COLUMN `ratings` JSON NOT NULL,
    ADD COLUMN `recommendations` JSON NOT NULL,
    ADD COLUMN `release_date` JSON NOT NULL,
    ADD COLUMN `required_age` VARCHAR(191) NOT NULL,
    ADD COLUMN `screenshots` JSON NOT NULL,
    ADD COLUMN `short_description` VARCHAR(191) NOT NULL,
    ADD COLUMN `steam_appid` INTEGER NOT NULL,
    ADD COLUMN `support_info` JSON NOT NULL,
    ADD COLUMN `supported_languages` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL,
    ADD COLUMN `website` VARCHAR(191) NOT NULL;
