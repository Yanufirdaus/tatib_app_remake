export interface AddPelanggaranDTO {
    jenisId: number;
    pelanggaran: string;
    poin: number;
    nomor: number;
}

export interface UpdatePelanggaranDTO {
    pelanggaran: string;
    poin: number;
}