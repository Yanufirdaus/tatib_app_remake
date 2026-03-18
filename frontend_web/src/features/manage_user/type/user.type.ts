import type { Control, FieldArrayWithId } from "react-hook-form";
import type { UpdateManySiswaKelasFormValues } from "@/features/manage_user/schemas/user.schema";
import type { Siswa } from "@/types/models";

export type SiswaRowProps = {
    s: Siswa;
    editId: number | null;
    setEditId: (id: number | null) => void;
    isLoadingKelas: boolean;
    options: { value: string, label: string }[];
    fields: FieldArrayWithId<UpdateManySiswaKelasFormValues, "kelasUpdate">[];
    controlKelas: Control<UpdateManySiswaKelasFormValues>;
    index: number;
}

export type ListSiswaProps = {
    siswa: Siswa[];
    isLoadingSiswa: boolean;
    fields: FieldArrayWithId<UpdateManySiswaKelasFormValues, "kelasUpdate">[];
    controlKelas: Control<UpdateManySiswaKelasFormValues>;
}

export interface CsvSiswaRow {
    nama: string;
    nisn: string;
    kelas: string;
}
