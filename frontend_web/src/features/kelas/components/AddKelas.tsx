import Input from "../../../components/ui/Input"
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
                    <div  className="flex flex-row gap-2">
                        <div className="basis-1/3 text-xs md:text-sm font-bold">
                            Grade (10/11/12)
                        </div>
                        <div className="basis-2/3 text-xs md:text-sm font-bold">
                            Nama Kelas
                        </div>
                    </div>
                ): (
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

            {fields?.length > 0 ? (
                    <div className="flex flex-row justify-center items-top h-fit gap-2 md:gap-4 py-3">
                        <button 
                            type="button"
                            className="bg-red-600 px-2 py-1 rounded-sm hover:bg-red-900 text-xs text-white font-medium"
                            onClick={cancelAddHandler}
                        >
                            Batal
                        </button>
                        <button 
                            type="submit"
                            className="bg-blue-500 px-2 py-1 rounded-sm hover:bg-blue-700 text-xs text-white font-medium"
                        >
                            {!isPendingAddKelas ? "tambahkan" : "memuat"}
                        </button>
                    </div>
                ): (
                    <></>
                )
            }
        </form>
    )
}

export default AddKelas;