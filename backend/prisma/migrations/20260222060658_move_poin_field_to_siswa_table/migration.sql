/*
  Warnings:

  - You are about to drop the column `poin` on the `User` table. All the data in the column will be lost.
  - Added the required column `poin` to the `Siswa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Siswa" ADD COLUMN     "poin" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "poin";
