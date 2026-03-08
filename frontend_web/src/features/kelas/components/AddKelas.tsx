import Input from "../../../components/ui/Input"

const AddKelas = ({ 
    addKelasCount, 
    cancelAddHandler 
} : { 
    addKelasCount: number, 
    cancelAddHandler: () => void }
) => {
    
    return (
        <form className="flex flex-col gap-2" onSubmit={()=>{}}>
            {addKelasCount > 0 ? (
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
            
            {Array.from({ length: addKelasCount }).map((_, index) => (
                <div key={index} className="flex flex-row gap-2">
                    <div className="basis-1/3">
                        <Input 
                            type="number"
                            placeholder="ex: 10"
                        />
                    </div>
                    <div className="basis-2/3">
                        <Input 
                            placeholder="ex: xi sainkes 1"
                        />
                    </div>
                </div>
            ))}

            {addKelasCount > 0 ? (
                    <div className="flex flex-row justify-center items-top h-fit gap-2 md:gap-4 py-3">
                        <button 
                            className="bg-red-600 px-2 py-1 rounded-sm hover:bg-red-900 text-xs text-white font-medium"
                            onClick={cancelAddHandler}
                        >
                            Batal
                        </button>
                        <button 
                            type="submit"
                            className="bg-blue-500 px-2 py-1 rounded-sm hover:bg-blue-700 text-xs text-white font-medium"
                        >
                            tambahkan
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