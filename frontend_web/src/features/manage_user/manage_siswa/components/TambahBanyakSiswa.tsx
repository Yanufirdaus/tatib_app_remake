import ActionButtons from "../../../../components/ui/ActionButtons";
import { MdLibraryAdd } from "react-icons/md";
import { RiContactsBookUploadLine } from "react-icons/ri";
import Input from "../../../../components/ui/Input";
import { useTambahBanyakSiswa } from "../hooks/useTambahBanyakSiswa";

const TambahBanyakSiswa = () => {
    const {
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
    } = useTambahBanyakSiswa();

    return (
        <div className="flex flex-col items-center gap-4">
            {!isTambahBanyakSiswa && (
                <button
                    className="bg-blue-500 px-2 py-1 rounded-sm hover:bg-blue-700 w-fit text-white font-bold text-xs md:text-sm"
                    onClick={() => setIsTambahBanyakSiswa(true)}
                >
                    <div className="flex flex-row items-center gap-2">
                        <MdLibraryAdd />
                        Tambah Banyak Siswa
                    </div>
                </button>
            )}
            {isTambahBanyakSiswa && (
                <div className="flex flex-col items-center gap-4">
                    <div className="w-xs md:w-xl rounded-lg border border-gray-500 border-dashed border-3 flex flex-col items-center justify-center p-6 gap-4">
                        <RiContactsBookUploadLine size={80} color="9BB4C0" />
                        <p className="text-sm text-gray-500 text-center">
                            Paste link Google Spreadsheet
                        </p>
                        <p className="text-xs text-gray-400 text-center">
                            Kolom yang dibutuhkan: <strong>nama</strong>, <strong>nisn</strong>, <strong>kelas</strong>
                        </p>
                        <Input
                            type="text"
                            value={sheetLink}
                            onChange={(e) => setSheetLink(e.target.value)}
                            placeholder="https://docs.google.com/spreadsheets/d/..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {csvData && unmatchedKelas.length === 0 && (
                            <p className="text-sm text-green-600 font-semibold">
                                ✅ {csvData.length} data siswa berhasil dimuat
                            </p>
                        )}
                        {unmatchedKelas.length > 0 && (
                            <div className="text-sm text-red-600">
                                <p className="font-semibold">⚠️ Kelas tidak ditemukan di database:</p>
                                <ul className="list-disc list-inside">
                                    {unmatchedKelas.map(k => (
                                        <li key={k}>{k}</li>
                                    ))}
                                </ul>
                                <p className="text-xs mt-1">Pastikan nama kelas di spreadsheet sama persis dengan yang ada di database.</p>
                            </div>
                        )}
                    </div>
                    <ActionButtons
                        typeButton="button"
                        onClick={csvData && unmatchedKelas.length === 0 ? handleSubmit : handleFetchSheet}
                        onCancel={resetState}
                        submitText={csvData && unmatchedKelas.length === 0 ? "Tambah" : "Muat Data"}
                        loadingText={isPendingCreate ? "Menambahkan..." : "Memuat..."}
                        isPending={isLoading || isPendingCreate}
                    />
                </div>
            )}
        </div>
    )
}

export default TambahBanyakSiswa;