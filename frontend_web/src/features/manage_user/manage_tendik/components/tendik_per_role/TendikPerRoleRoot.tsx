import ListTendik from "./ListTendik";
import { CreateTendikSchema, type CreateTendikFormValues } from "@/features/manage_user/schemas/user.schema";
import { type TendikRole } from "@/constants/roles";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddTendik } from "@/features/manage_user/manage_tendik/hooks/useTendik";
import AddTendikForm from "./AddTendik";
import PageContainer from "@/components/ui/PageContainer";
import FeatureHeader from "@/components/ui/FeatureHeader";

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
                reset();
            }
        });
    };

    return (
        <PageContainer className="py-6">
            <FeatureHeader
                title={`Tendik ${role.toUpperCase()}`}
                onActionClick={() => {
                    append({
                        name: "",
                        nip: "",
                        role: role,
                    });
                }}
            />

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
        </PageContainer>
    )
}

export default TendikPerRoleRoot;
