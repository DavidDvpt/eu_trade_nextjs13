/*
  Warnings:

  - You are about to drop the column `modifiedAt` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `modifiedAt` on the `ItemCategory` table. All the data in the column will be lost.
  - You are about to drop the column `modifiedAt` on the `ItemType` table. All the data in the column will be lost.
  - You are about to drop the column `modifiedAt` on the `Sell` table. All the data in the column will be lost.
  - You are about to drop the column `modifiedAt` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `modifiedAt` on the `SessionRow` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Item` DROP COLUMN `modifiedAt`,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `ItemCategory` DROP COLUMN `modifiedAt`,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `ItemType` DROP COLUMN `modifiedAt`,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Sell` DROP COLUMN `modifiedAt`,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Session` DROP COLUMN `modifiedAt`,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `SessionRow` DROP COLUMN `modifiedAt`,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;
