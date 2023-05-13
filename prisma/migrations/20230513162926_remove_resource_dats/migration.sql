/*
  Warnings:

  - You are about to drop the column `resourceId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `Resource` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResourceType` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `itemId` on table `Transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Resource` DROP FOREIGN KEY `Resource_resourceTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_itemId_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_resourceId_fkey`;

-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `resourceId`,
    MODIFY `itemId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Resource`;

-- DropTable
DROP TABLE `ResourceType`;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
