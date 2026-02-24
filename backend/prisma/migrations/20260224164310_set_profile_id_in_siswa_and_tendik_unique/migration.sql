/*
  Warnings:

  - A unique constraint covering the columns `[profileId]` on the table `Siswa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileId]` on the table `Tendik` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Siswa_profileId_key" ON "Siswa"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Tendik_profileId_key" ON "Tendik"("profileId");
