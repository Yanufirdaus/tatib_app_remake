import SelectOption from "../../../components/ui/option"
import type { FilterSectionProps } from "../type/pelanggaran.type";

const FilterSection = ({
    isLoading, options, register
}: FilterSectionProps) => {

    return (
        <div className="flex flex-row w-full px-6 md:px-0 justify-left items-center md:justify-center">
            <form>
                <SelectOption selectOption={isLoading ? [] : options} label="Jenis Pelanggaran :   " {...register("jenisPelanggaran")} />
            </form>
        </div>
    )
}

export default FilterSection;