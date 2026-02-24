-- CreateTable
CREATE TABLE "Semester" (
    "id" SERIAL NOT NULL,
    "semester" TEXT NOT NULL,
    "tahun_ajaran" TEXT NOT NULL,

    CONSTRAINT "Semester_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JenisPelanggaran" (
    "id" SERIAL NOT NULL,
    "jenis_pelanggaran" TEXT NOT NULL,

    CONSTRAINT "JenisPelanggaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pelanggaran" (
    "id" SERIAL NOT NULL,
    "jenisId" INTEGER NOT NULL,
    "pelanggaran" TEXT NOT NULL,
    "poin" INTEGER NOT NULL,

    CONSTRAINT "Pelanggaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CatatanPelanggaran" (
    "id" SERIAL NOT NULL,
    "idPelanggar" INTEGER NOT NULL,
    "idKelasPelanggar" INTEGER NOT NULL,
    "idPencatat" INTEGER NOT NULL,
    "idPelanggaran" INTEGER NOT NULL,
    "semester" TEXT NOT NULL,
    "time" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CatatanPelanggaran_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pelanggaran" ADD CONSTRAINT "Pelanggaran_jenisId_fkey" FOREIGN KEY ("jenisId") REFERENCES "JenisPelanggaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CatatanPelanggaran" ADD CONSTRAINT "CatatanPelanggaran_idPelanggar_fkey" FOREIGN KEY ("idPelanggar") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CatatanPelanggaran" ADD CONSTRAINT "CatatanPelanggaran_idKelasPelanggar_fkey" FOREIGN KEY ("idKelasPelanggar") REFERENCES "Kelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CatatanPelanggaran" ADD CONSTRAINT "CatatanPelanggaran_idPencatat_fkey" FOREIGN KEY ("idPencatat") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CatatanPelanggaran" ADD CONSTRAINT "CatatanPelanggaran_idPelanggaran_fkey" FOREIGN KEY ("idPelanggaran") REFERENCES "Pelanggaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
