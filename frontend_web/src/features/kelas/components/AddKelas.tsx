import Input from "../../../components/ui/Input"
import ActionButtons from "../../../components/ui/ActionButtons"
import type { AddKelasProps } from "../type/add.kelas.props.type";

const AddKelas = ({
    fields,
    register,
    cancelAddHandler,
    onSubmit,
    isPendingAddKelas,
    errors
}: AddKelasProps) => {

    return (
        <form className="flex flex-col gap-2" onSubmit={onSubmit}>
            {fields?.length > 0 ? (
                <div className="flex flex-row gap-2">
                    <div className="basis-1/3 text-xs md:text-sm font-bold">
                        Grade (10/11/12)
                    </div>
                    <div className="basis-2/3 text-xs md:text-sm font-bold">
                        Nama Kelas
                    </div>
                </div>
            ) : (
                <></>
            )
            }

            {fields?.map((field, index) => (
                <div key={field.id} className="flex flex-row gap-2">
                    <div className="basis-1/3">
                        <Input
                            {...register(`kelas.${index}.grade` as const)}
                            placeholder="ex: 10"
                            error={errors?.kelas?.[index]?.grade?.message}
                        />
                    </div>
                    <div className="basis-2/3">
                        <Input
                            {...register(`kelas.${index}.name` as const)}
                            placeholder="ex: xi sainkes 1"
                            error={errors?.kelas?.[index]?.name?.message}
                        />
                    </div>
                </div>
            ))}

            {
                fields?.length > 0 ? (
                    <ActionButtons
                        onCancel={cancelAddHandler}
                        isPending={isPendingAddKelas}
                        submitText="tambahkan"
                        loadingText="memuat"
                    />
                ) : (
                    <></>
                )
            }
        </form>
    )
}

export default AddKelas;