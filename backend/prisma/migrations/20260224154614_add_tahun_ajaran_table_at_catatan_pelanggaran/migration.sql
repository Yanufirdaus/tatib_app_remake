/*
  Warnings:

  - Added the required column `tahun_ajaran` to the `CatatanPelanggaran` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CatatanPelanggaran" ADD COLUMN     "tahun_ajaran" TEXT NOT NULL;
