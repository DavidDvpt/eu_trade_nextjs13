-- AlterTable
ALTER TABLE `Transaction` ADD COLUMN `sessionId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `clickCount` INTEGER NULL,
    `context` ENUM('TRADE', 'MINING', 'CRAFT') NULL,
    `status` ENUM('ACTIVE', 'SOLDED') NULL,
    `state` ENUM('OPEN', 'CLOSE') NULL,
    `totalOutTT` DOUBLE NULL DEFAULT 0,
    `totalOutTTC` DOUBLE NULL DEFAULT 0,
    `totalInTT` DOUBLE NULL DEFAULT 0,
    `totalInTTC` DOUBLE NULL DEFAULT 0,
    `totalFee` DOUBLE NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
