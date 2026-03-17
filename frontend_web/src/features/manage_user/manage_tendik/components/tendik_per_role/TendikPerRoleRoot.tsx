import { FaPlusSquare } from "react-icons/fa";
import TitlePage from "../../../../../components/ui/TitlePage";
import ListTendik from "./ListTendik";
import { CreateTendikSchema, type CreateTendikFormValues, type TendikRole } from "../../../schema/user.schema";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddTendik } from "../../hooks/useTendik";
import AddTendikForm from "./AddTendik";

const TendikPerRoleRoot = ({ role }: { role: TendikRole }) => {
    const {
        register: registerAdd,
        handleSubmit: handleSubmitAdd,
        control,
        formState: { errors: errorAdd },
        reset
    } = useForm<CreateTendikFormValues>({
        resolver: zodResolver(CreateTendikSchema),
        defaultValues: { tendik: [] }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "tendik"
    });

    const { mutate: addTendik, isPending: isPendingAddTendik } = useAddTendik();

    const onSubmitAdd = (data: CreateTendikFormValues) => {
        addTendik(data, {
            onSuccess: () => {
                alert("Berhasil menambahkan tendik");
                reset();
            },
            onError: (err: any) => {
                alert(err.message);
            }
        });
    };

    return (
        <div className="flex flex-col min-h-screen w-full py-6 md:py-8 gap-8 items-center">
            <div className="flex flex-row w-full">
                <div className="basis-2/8"></div>
                <div className="basis-6/8">
                    <TitlePage title={`Tendik ${role.toUpperCase()}`} />
                </div>
                <div className="basis-2/8">
                    <FaPlusSquare
                        className="size-6 fill-green-600 cursor-pointer"
                        onClick={() => {
                            append({
                                name: "",
                                nip: "",
                                role: role,
                            });
                        }}
                    />
                </div>
            </div>

            <AddTendikForm
                fields={fields}
                registerAdd={registerAdd}
                errorAdd={errorAdd}
                remove={remove}
                onSubmitAdd={handleSubmitAdd(onSubmitAdd)}
                isPendingAddTendik={isPendingAddTendik}
                reset={reset}
                role={role}
            />

            <ListTendik role={role} />
        </div>
    )
}

export default TendikPerRoleRoot;