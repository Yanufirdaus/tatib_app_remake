/*
  Warnings:

  - Made the column `nomor` on table `Pelanggaran` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Pelanggaran" ALTER COLUMN "nomor" SET NOT NULL;
