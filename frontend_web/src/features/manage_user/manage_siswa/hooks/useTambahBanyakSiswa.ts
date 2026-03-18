import { useState } from "react";
import { useKelas } from "@/features/kelas/hooks/useKelas";
import { useCreateManySiswa } from "./useSiswa";
import type { CsvSiswaRow } from "@/features/manage_user/type/user.type";
import { extractGoogleSheetId, fetchAndParseCsv, getGoogleSheetCsvUrl } from "@/utils/csvHelper";

export const useTambahBanyakSiswa = () => {
    const [isTambahBanyakSiswa, setIsTambahBanyakSiswa] = useState(false);
    const [sheetLink, setSheetLink] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [csvData, setCsvData] = useState<CsvSiswaRow[] | null>(null);
    const [unmatchedKelas, setUnmatchedKelas] = useState<string[]>([]);
    const [localError, setLocalError] = useState<string | null>(null);

    const { data: kelasList } = useKelas();
    const { mutate: createManySiswa, isPending: isPendingCreate } = useCreateManySiswa();

    const mapKelasNameToId = (kelasName: string): number | null => {
        if (!kelasList) return null;
        const matched = kelasList.find(
            (k: { id: number; name: string }) => k.name.toLowerCase() === kelasName.toLowerCase()
        );
        return matched ? matched.id : null;
    };

    const handleFetchSheet = async () => {
        const sheetId = extractGoogleSheetId(sheetLink);
        if (!sheetId) {
            setLocalError("Link Google Spreadsheet tidak valid");
            return;
        }

        const csvUrl = getGoogleSheetCsvUrl(sheetId);

        setIsLoading(true);
        setUnmatchedKelas([]);
        try {
            setLocalError(null);
            const data = await fetchAndParseCsv<CsvSiswaRow>(csvUrl);

            const uniqueKelas = [...new Set(data.map(row => row.kelas))];
            const notFound = uniqueKelas.filter(name => !mapKelasNameToId(name));

            if (notFound.length > 0) {
                setUnmatchedKelas(notFound);
            }

            setCsvData(data);
        } catch {
            setLocalError("Gagal mengambil data. Pastikan spreadsheet di-set 'Anyone with the link'.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = () => {
        if (!csvData || !kelasList) return;

        const mappedSiswa = csvData.map(row => {
            const kelasId = mapKelasNameToId(row.kelas);
            if (!kelasId) throw new Error(`Kelas "${row.kelas}" tidak ditemukan di database`);

            return {
                name: row.nama,
                nisn: row.nisn,
                kelasId: String(kelasId),
            };
        });

        createManySiswa(
            { siswa: mappedSiswa },
            {
                onSuccess: () => {
                    resetState();
                },
            }
        );
    };

    const resetState = () => {
        setIsTambahBanyakSiswa(false);
        setSheetLink("");
        setCsvData(null);
        setUnmatchedKelas([]);
        setLocalError(null);
    };

    return {
        isTambahBanyakSiswa,
        setIsTambahBanyakSiswa,
        sheetLink,
        setSheetLink,
        isLoading,
        csvData,
        unmatchedKelas,
        isPendingCreate,
        localError,
        setLocalError,
        handleFetchSheet,
        handleSubmit,
        resetState
    };
};
