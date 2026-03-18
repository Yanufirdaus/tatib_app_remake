import ActionButtons from "@/components/ui/ActionButtons";
import { MdLibraryAdd } from "react-icons/md";
import { RiContactsBookUploadLine } from "react-icons/ri";
import Input from "@/components/ui/Input";
import Alert from "@/components/ui/Alert";
import { useTambahBanyakSiswa } from "@/features/manage_user/manage_siswa/hooks/useTambahBanyakSiswa";

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
        localError,
        handleFetchSheet,
        handleSubmit,
        resetState
    } = useTambahBanyakSiswa();

    return (
        <div className="flex flex-col items-center gap-4 w-full px-6">
            {localError && (
                <div className="w-full max-w-xl">
                    <Alert type="error" message={localError} />
                </div>
            )}
            {!isTambahBanyakSiswa && (
                <button
                    className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 w-fit text-white font-semibold text-sm transition-all shadow-sm active:scale-95"
                    onClick={() => setIsTambahBanyakSiswa(true)}
                >
                    <div className="flex flex-row items-center gap-2">
                        <MdLibraryAdd size={18} />
                        Tambah Banyak Siswa
                    </div>
                </button>
            )}
            {isTambahBanyakSiswa && (
                <div className="flex flex-col items-center gap-6 w-full animate-fade-in">
                    <div className="w-full max-w-xl rounded-xl border-2 border-slate-200 border-dashed bg-slate-50 flex flex-col items-center justify-center p-8 gap-6 transition-all">
                        <div className="p-4 bg-white rounded-full shadow-sm">
                            <RiContactsBookUploadLine size={64} className="text-blue-500" />
                        </div>
                        <div className="text-center">
                            <p className="text-base font-semibold text-slate-700">
                                Paste link Google Spreadsheet
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                                Kolom wajib: <span className="font-mono text-blue-600 bg-blue-50 px-1 rounded">nama</span>, <span className="font-mono text-blue-600 bg-blue-50 px-1 rounded">nisn</span>, <span className="font-mono text-blue-600 bg-blue-50 px-1 rounded">kelas</span>
                            </p>
                        </div>
                        <Input
                            type="text"
                            value={sheetLink}
                            onChange={(e) => setSheetLink(e.target.value)}
                            placeholder="https://docs.google.com/spreadsheets/d/..."
                            className="w-full"
                        />
                        {csvData && unmatchedKelas.length === 0 && (
                            <Alert type="success" message={`${csvData.length} data siswa berhasil dimuat.`} />
                        )}
                        {unmatchedKelas.length > 0 && (
                            <div className="w-full">
                                <Alert
                                    type="warning"
                                    message={
                                        <div>
                                            <p className="font-semibold mb-1">Kelas tidak ditemukan di database:</p>
                                            <ul className="list-disc list-inside text-xs opacity-90">
                                                {unmatchedKelas.map((k: string) => (
                                                    <li key={k}>{k}</li>
                                                ))}
                                            </ul>
                                            <p className="text-[10px] mt-2 italic">Pastikan nama kelas di spreadsheet sesuai dengan database.</p>
                                        </div>
                                    }
                                />
                            </div>
                        )}
                    </div>
                    <ActionButtons
                        typeButton="button"
                        onClick={csvData && unmatchedKelas.length === 0 ? handleSubmit : handleFetchSheet}
                        onCancel={resetState}
                        submitText={csvData && unmatchedKelas.length === 0 ? "Tambah Ke Database" : "Tarik Data"}
                        loadingText={isPendingCreate ? "Sedang Menambahkan..." : "Sedang Menarik..."}
                        isPending={isLoading || isPendingCreate}
                        className="w-full max-w-xl"
                    />
                </div>
            )}
        </div>
    )
}

export default TambahBanyakSiswa;