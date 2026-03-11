import SelectOption from "../../../components/ui/option"
import type { FilterSectionProps } from "../../../types/input.types";

const FilterSection = ({
    isLoading, options, register
} : FilterSectionProps ) => {

    return (
        <div className="flex flex-row min-w-screen px-4 md:px-0 justify-left items-center md:justify-center">
            <form>
                <SelectOption selectOption={isLoading ? [] : options} label="Jenis Pelanggaran :   " {...register("jenisPelanggaran")}/>
            </form>
        </div>
    )
}

export default FilterSection;