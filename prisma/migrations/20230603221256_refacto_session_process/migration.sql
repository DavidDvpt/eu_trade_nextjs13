/*
  Warnings:

  - You are about to drop the column `status` on the `Session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Item` ADD COLUMN `decay` DOUBLE NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Session` DROP COLUMN `status`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `modifiedAt` DATETIME(3) NULL,
    MODIFY `state` ENUM('OPEN', 'CLOSE', 'CLOSED') NULL;

-- CreateTable
CREATE TABLE `SessionRow` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modifiedAt` DATETIME(3) NULL,
    `sessionId` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `fee` DOUBLE NULL DEFAULT 0,
    `value` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sell` (
    `id` VARCHAR(191) NOT NULL,
    `status` ENUM('ENDED', 'PROGRESS', 'RETURNED') NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modifiedAt` DATETIME(3) NULL,
    `quantity` INTEGER NOT NULL,
    `fee` DOUBLE NULL DEFAULT 0,
    `value` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SessionRowSellRelation` (
    `sessionRowId` VARCHAR(191) NOT NULL,
    `sellId` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`sessionRowId`, `sellId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SessionRow` ADD CONSTRAINT `SessionRow_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SessionRow` ADD CONSTRAINT `SessionRow_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sell` ADD CONSTRAINT `Sell_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sell` ADD CONSTRAINT `Sell_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SessionRowSellRelation` ADD CONSTRAINT `SessionRowSellRelation_sessionRowId_fkey` FOREIGN KEY (`sessionRowId`) REFERENCES `SessionRow`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SessionRowSellRelation` ADD CONSTRAINT `SessionRowSellRelation_sellId_fkey` FOREIGN KEY (`sellId`) REFERENCES `Sell`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
