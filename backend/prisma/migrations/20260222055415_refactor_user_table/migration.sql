/*
  Warnings:

  - You are about to drop the column `kelasId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nip` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nisn` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_kelasId_fkey";

-- DropIndex
DROP INDEX "User_nip_key";

-- DropIndex
DROP INDEX "User_nisn_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "kelasId",
DROP COLUMN "nip",
DROP COLUMN "nisn";

-- CreateTable
CREATE TABLE "Siswa" (
    "id" SERIAL NOT NULL,
    "nisn" TEXT NOT NULL,
    "profileId" INTEGER NOT NULL,
    "kelasId" INTEGER NOT NULL,

    CONSTRAINT "Siswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tendik" (
    "id" SERIAL NOT NULL,
    "nip" TEXT NOT NULL,
    "profileId" INTEGER NOT NULL,

    CONSTRAINT "Tendik_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Siswa_nisn_key" ON "Siswa"("nisn");

-- CreateIndex
CREATE UNIQUE INDEX "Tendik_nip_key" ON "Tendik"("nip");

-- AddForeignKey
ALTER TABLE "Siswa" ADD CONSTRAINT "Siswa_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Siswa" ADD CONSTRAINT "Siswa_kelasId_fkey" FOREIGN KEY ("kelasId") REFERENCES "Kelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tendik" ADD CONSTRAINT "Tendik_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
