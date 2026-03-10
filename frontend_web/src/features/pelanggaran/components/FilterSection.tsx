import SelectOption from "../../../components/ui/option"

const option = [
    {
        value: "Kedisiplinan",
        label: "Kedisiplinan"
    },
    {
        value: "p",
        label: "p"
    }
]

const FilterSection = () => {
    return (
        <div className="flex flex-row min-w-screen px-4 md:px-12 justify-left items-center md:justify-center">
            <SelectOption selectOption={option} label="Jenis Pelanggaran :   "/>
        </div>
    )
}

export default FilterSection;