import type { Control, FieldArrayWithId } from "react-hook-form";
import type { UpdateManySiswaKelasFormValues } from "../schema/user.schema";

export type SiswaRowProps = {
    s: any;
    editId: number | null;
    setEditId: (id: number | null) => void;
    isLoadingKelas: boolean;
    options: { value: string, label: string }[];
    fields: FieldArrayWithId<UpdateManySiswaKelasFormValues, "kelasUpdate">[];
    controlKelas: Control<UpdateManySiswaKelasFormValues>;
    index: number;
}

export type ListSiswaProps = {
    siswa: any;
    isLoadingSiswa: boolean;
    fields: FieldArrayWithId<UpdateManySiswaKelasFormValues, "kelasUpdate">[];
    controlKelas: Control<UpdateManySiswaKelasFormValues>;
}
