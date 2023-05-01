/*
  Warnings:

  - The values [MINING] on the enum `Transaction_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Transaction` ADD COLUMN `context` ENUM('TRADE', 'MINING', 'CRAFING') NOT NULL DEFAULT 'TRADE',
    MODIFY `type` ENUM('BUY', 'SELL') NOT NULL;
