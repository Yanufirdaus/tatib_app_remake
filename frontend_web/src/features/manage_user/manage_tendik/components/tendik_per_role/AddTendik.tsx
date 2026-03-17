import { FaTrashAlt } from "react-icons/fa";
import { type FieldArrayWithId, type UseFormRegister, type FieldErrors, type UseFormReset } from "react-hook-form";
import { type CreateTendikFormValues, type TendikRole } from "../../../schema/user.schema";
import Input from "../../../../../components/ui/Input";
import ActionButtons from "../../../../../components/ui/ActionButtons";

interface AddTendikFormProps {
    fields: FieldArrayWithId<CreateTendikFormValues, "tendik", "id">[];
    registerAdd: UseFormRegister<CreateTendikFormValues>;
    errorAdd: FieldErrors<CreateTendikFormValues>;
    remove: (index?: number | number[]) => void;
    onSubmitAdd: () => void;
    isPendingAddTendik: boolean;
    reset: UseFormReset<CreateTendikFormValues>;
    role: TendikRole;
}

const AddTendikForm = ({
    fields,
    registerAdd,
    errorAdd,
    remove,
    onSubmitAdd,
    isPendingAddTendik,
    reset,
}: AddTendikFormProps) => {
    if (fields.length === 0) return null;

    return (
        <div className="flex flex-col gap-2 w-full md:w-150 px-4 md:px-0 items-center">
            <h1 className="text-sm md:text-base font-bold md:font-extrabold">Tambah Tendik</h1>
            <div className="grid grid-cols-12 gap-2 w-full font-semibold text-xs md:text-sm mb-1 px-1">
                <div className="col-span-5">Nama</div>
                <div className="col-span-3">NIP</div>
                <div className="col-span-3">Jabatan</div>
                <div className="col-span-1"></div>
            </div>
            {
                fields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-12 gap-2 w-full items-start">
                        <div className="col-span-5">
                            <Input
                                placeholder="Masukkan Nama"
                                type="text"
                                {...registerAdd(`tendik.${index}.name`)}
                                error={errorAdd.tendik?.[index]?.name?.message}
                                className="h-10"
                            />
                        </div>
                        <div className="col-span-3">
                            <Input
                                placeholder="Masukkan NIP"
                                type="text"
                                {...registerAdd(`tendik.${index}.nip`)}
                                error={errorAdd.tendik?.[index]?.nip?.message}
                                className="h-10"
                            />
                        </div>
                        <div className="col-span-3">
                            <Input
                                type="text"
                                {...registerAdd(`tendik.${index}.role`)}
                                error={errorAdd.tendik?.[index]?.role?.message}
                                className="h-10 bg-gray-100 cursor-not-allowed"
                                readOnly
                            />
                        </div>
                        <div className="col-span-1 pt-2 flex justify-center">
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="bg-red-600 text-white px-2 py-1 rounded-lg text-xs md:text-sm hover:bg-red-700 transition-colors"
                            >
                                <FaTrashAlt />
                            </button>
                        </div>
                    </div>
                ))
            }
            <ActionButtons
                typeButton="button"
                onClick={onSubmitAdd}
                isPending={isPendingAddTendik}
                onCancel={() => reset()}
            />
        </div>
    );
};

export default AddTendikForm;
