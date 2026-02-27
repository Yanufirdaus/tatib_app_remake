import { z } from "zod";
import { no } from "zod/v4/locales";

export const AddCatatanPelanggaranSchema = z.object({
    idPelanggaran: z.coerce.number({ message: "Pelanggaran ID must be a number" }).min(1, { message: "Pelanggaran ID is required" }),
    idPelanggar: z.coerce.number({ message: "Pelanggar ID must be a number" }).min(1, { message: "Pelanggar ID is required" }).min(1, { message: "Minimal 1 pelanggar harus dipilih" }),
    idPencatat: z.coerce.number({ message: "Pencatat ID must be a number" }).min(1, { message: "Pencatat ID is required" }),
    idKelasPelanggar: z.coerce.number({ message: "Kelas Pelanggar ID must be a number" }).min(1, { message: "Kelas Pelanggar ID is required" }),
    bukti: z.string().min(1, { message: "Bukti is required" }),
    semester: z.string().min(1, { message: "Semester is required" }),
    time: z.string().refine(val => !isNaN(Date.parse(val)), { message: "Time must be a valid date string" }),
    tahun_ajaran: z.string().min(1, { message: "Tahun Ajaran is required" }),
    note: z.string().optional(),
});

export const AddManyCatatanPelanggaranSchema = z.object({
    idPelanggaran: z.coerce.number({ message: "Pelanggaran ID must be a number" }).min(1, { message: "Pelanggaran ID is required" }),
    idPelanggar: z.array(z.coerce.number({ message: "Pelanggar ID must be a number" }).min(1, { message: "Pelanggar ID is required" })).min(1, { message: "Minimal 1 pelanggar harus dipilih" }),
    idPencatat: z.coerce.number({ message: "Pencatat ID must be a number" }).min(1, { message: "Pencatat ID is required" }),
    idKelasPelanggar: z.coerce.number({ message: "Kelas Pelanggar ID must be a number" }).min(1, { message: "Kelas Pelanggar ID is required" }),
    bukti: z.string().min(1, { message: "Bukti is required" }),
    semester: z.string().min(1, { message: "Semester is required" }),
    time: z.string().refine(val => !isNaN(Date.parse(val)), { message: "Time must be a valid date string" }),
    tahun_ajaran: z.string().min(1, { message: "Tahun Ajaran is required" }),
    note: z.string().optional(),
});