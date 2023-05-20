/*
  Warnings:

  - Made the column `itemTypeId` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Item` DROP FOREIGN KEY `Item_itemTypeId_fkey`;

-- AlterTable
ALTER TABLE `Item` MODIFY `itemTypeId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_itemTypeId_fkey` FOREIGN KEY (`itemTypeId`) REFERENCES `ItemType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
