/*
  Warnings:

  - Added the required column `bukti` to the `CatatanPelanggaran` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CatatanPelanggaran" ADD COLUMN     "bukti" TEXT NOT NULL;
