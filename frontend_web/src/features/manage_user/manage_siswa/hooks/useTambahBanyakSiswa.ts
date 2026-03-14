import { useState } from "react";
import Papa from "papaparse";
import { useKelas } from "../../../kelas/hooks/useKelas";
import { useCreateManySiswa } from "./useSiswa";
import type { CsvSiswaRow } from "../../type/user.type";

export const useTambahBanyakSiswa = () => {
    const [isTambahBanyakSiswa, setIsTambahBanyakSiswa] = useState(false);
    const [sheetLink, setSheetLink] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [csvData, setCsvData] = useState<CsvSiswaRow[] | null>(null);
    const [unmatchedKelas, setUnmatchedKelas] = useState<string[]>([]);

    const { data: kelasList } = useKelas();
    const { mutate: createManySiswa, isPending: isPendingCreate } = useCreateManySiswa();

    const extractSheetId = (url: string): string | null => {
        const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
        return match ? match[1] : null;
    };

    const mapKelasNameToId = (kelasName: string): number | null => {
        if (!kelasList) return null;
        const matched = kelasList.find(
            (k: { id: number; name: string }) => k.name.toLowerCase() === kelasName.toLowerCase()
        );
        return matched ? matched.id : null;
    };

    const handleFetchSheet = async () => {
        const sheetId = extractSheetId(sheetLink);
        if (!sheetId) {
            alert("Link Google Spreadsheet tidak valid");
            return;
        }

        const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

        setIsLoading(true);
        setUnmatchedKelas([]);
        try {
            const response = await fetch(csvUrl);
            if (!response.ok) throw new Error("Gagal mengambil data spreadsheet");

            const csvText = await response.text();
            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const data = results.data as CsvSiswaRow[];

                    const uniqueKelas = [...new Set(data.map(row => row.kelas))];
                    const notFound = uniqueKelas.filter(name => !mapKelasNameToId(name));

                    if (notFound.length > 0) {
                        setUnmatchedKelas(notFound);
                    }

                    setCsvData(data);
                },
            });
        } catch (error) {
            console.error(error);
            alert("Gagal mengambil data. Pastikan spreadsheet di-set 'Anyone with the link'.");
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
                    alert(`${mappedSiswa.length} siswa berhasil ditambahkan`);
                    resetState();
                },
                onError: (error: any) => {
                    const message = error?.response?.data?.message || error?.message || "Terjadi kesalahan";
                    alert(message);
                },
            }
        );
    };

    const resetState = () => {
        setIsTambahBanyakSiswa(false);
        setSheetLink("");
        setCsvData(null);
        setUnmatchedKelas([]);
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
        handleFetchSheet,
        handleSubmit,
        resetState
    };
};
