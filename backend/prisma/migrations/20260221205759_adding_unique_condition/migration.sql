/*
  Warnings:

  - A unique constraint covering the columns `[jenis_pelanggaran]` on the table `JenisPelanggaran` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nip]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nisn]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "JenisPelanggaran_jenis_pelanggaran_key" ON "JenisPelanggaran"("jenis_pelanggaran");

-- CreateIndex
CREATE UNIQUE INDEX "User_nip_key" ON "User"("nip");

-- CreateIndex
CREATE UNIQUE INDEX "User_nisn_key" ON "User"("nisn");
