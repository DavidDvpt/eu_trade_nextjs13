-- CreateTable
CREATE TABLE `TransactionRelation` (
    `inId` VARCHAR(191) NOT NULL,
    `outId` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`inId`, `outId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TransactionRelation` ADD CONSTRAINT `TransactionRelation_inId_fkey` FOREIGN KEY (`inId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionRelation` ADD CONSTRAINT `TransactionRelation_outId_fkey` FOREIGN KEY (`outId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
