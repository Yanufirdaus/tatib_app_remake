import { FaPlusSquare } from "react-icons/fa"
import ListKelas from "./ListKelas"
import { useState } from "react"

const ManajemenKelasRoot = () => {
    const [ addKelasCount, setAddKelasCount]  = useState(0)
    return (
         <div className="flex flex-col min-w-screen min-h-screen items-center py-8 gap-6">
            <div className="flex flex-row min-w-screen">
                <div className="basis-2/7"></div>
                <div className="basis-3/7">
                    <h1 className="text-lg md:text-2xl font-bold text-center">Manajemen Kelas</h1>
                </div>
                <div className="flex flex-row basis-2/7 justify-center items-center">
                    <FaPlusSquare className="size-6 fill-green-600" onClick={() => setAddKelasCount(prev => prev + 1)}/>
                </div>
            </div>
            <ListKelas addKelasCount={addKelasCount} cancelAddHandler={() => setAddKelasCount(0)}/>
        </div>
    )
}

export default ManajemenKelasRoot