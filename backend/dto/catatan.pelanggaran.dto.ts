interface AddCatatanPelanggaranDTO {
    idPelanggaran: number;
    idPelanggar: number;
    idKelasPelanggar: number;
    idPencatat: number;
    bukti: string;
    semester: string;
    time: Date;
    tahun_ajaran: string;
    note?: string;
}

interface AddManyCatatanPelanggaranDTO {
    idPelanggaran: number;
    idPelanggar: number[];
    idKelasPelanggar: number;
    idPencatat: number;
    bukti: string;
    semester: string;
    time: Date;
    tahun_ajaran: string;
    note?: string;
}