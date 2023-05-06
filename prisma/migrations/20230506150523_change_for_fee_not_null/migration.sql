/*
  Warnings:

  - Made the column `fee` on table `Transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Transaction` MODIFY `fee` DOUBLE NOT NULL DEFAULT 0;
