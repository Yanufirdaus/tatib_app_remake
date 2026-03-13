import { FaPlusSquare } from "react-icons/fa";
import TitlePage from "../../../../../components/ui/TitlePage";
import { useKelasById } from "../../../../kelas/hooks/useKelas";
import ListSiswa from "./ListSiswa";
import { useState } from "react";
import AddSiswa from "./AddSiswa";
import { useSiswaByKelas, useUpdateManySiswaKelas } from "../../hooks/useSiswa";
import { useFieldArray, useForm } from "react-hook-form";
import { UpdateManySiswaKelasSchema, type UpdateManySiswaKelasFormValues } from "../../../schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ActionButtons from "../../../../../components/ui/ActionButtons";

const SiswaKelasRoot = ({ id }: { id: number }) => {
    const [isAddSiswa, setIsAddSiswa] = useState(false);
    const [isEditKelasSiswa, setIsEditKelasSiswa] = useState(false);

    const { data: kelas, isLoading: isLoadingKelas } = useKelasById(id);

    const { data: siswa, isLoading: isLoadingSiswa } = useSiswaByKelas(id);

    const { mutate, isPending } = useUpdateManySiswaKelas();

    //update many user kelas
    const {
        handleSubmit: handleSubmitKelas,
        control,
        getValues
    } = useForm<UpdateManySiswaKelasFormValues>({
        resolver: zodResolver(UpdateManySiswaKelasSchema),
        defaultValues: {
            kelasUpdate: []
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "kelasUpdate"
    });

    const onSubmitKelas = (data: UpdateManySiswaKelasFormValues) => {
        mutate(data, {
            onSuccess: () => {
                setIsEditKelasSiswa(false)
                remove()
                alert("Data berhasil diupdate")
            },
            onError: (error) => {
                console.log(error)
                alert("Data gagal diupdate")
            }
        })
    }

    return (
        <div className="flex flex-col min-h-screen w-full py-6 md:py-8 gap-8">
            <div className="flex flex-row w-full">
                <div className="basis-2/8"></div>
                <div className="basis-6/8">
                    <TitlePage title={`Siswa Kelas ${isLoadingKelas ? "" : kelas?.name.toUpperCase()}`} />
                </div>
                <div className="basis-2/8">
                    {
                        isAddSiswa ? (
                            <></>
                        ) : (
                            <FaPlusSquare
                                className="size-6 fill-green-600 cursor-pointer"
                                onClick={() => { setIsAddSiswa(true) }}
                            />
                        )
                    }
                </div>
            </div>
            <div className="flex justify-center">
                {
                    isEditKelasSiswa ? (
                        <ActionButtons
                            onClick={() => {
                                console.log(getValues())
                                handleSubmitKelas(onSubmitKelas)()
                            }}
                            onCancel={() => {
                                remove()
                                setIsEditKelasSiswa(false)
                            }}
                            cancelText="Batal"
                            submitText="Simpan"
                            loadingText="Memuat..."
                            isPending={isPending}
                            className=""
                            typeButton="button"
                            disabled={isPending ? true : false}
                        />
                    ) : (
                        <button
                            className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs md:text-sm"
                            onClick={() => {
                                if (siswa.length > 0) {
                                    Array.from({ length: siswa.length }).forEach((_, index) => {
                                        append({
                                            siswaIds: String(siswa[index].id),
                                            kelasIds: String(siswa[index].kelasId)
                                        })
                                    })
                                }
                                setIsEditKelasSiswa(true)
                            }}
                        >Kenaikan Kelas</button>
                    )
                }
            </div>
            {
                isAddSiswa && (
                    <AddSiswa setIsAddSiswa={setIsAddSiswa} kelasId={id} />
                )
            }
            <ListSiswa siswa={siswa} isLoadingSiswa={isLoadingSiswa} fields={fields} controlKelas={control} />
        </div>
    )
}

export default SiswaKelasRoot;