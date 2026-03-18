import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Input from "@/components/ui/Input";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { LoginSchema, type LoginFormValues } from "@/features/auth/schemas/login.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/store/auth.store";
import { useNavigate } from "react-router-dom";
import Alert from "@/components/ui/Alert";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { mutate, isPending, error } = useLogin();
    const { setUser } = useAuthStore();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(LoginSchema)
    });

    const onSubmit = (data: LoginFormValues) => {
        mutate(data, {
            onSuccess: (response) => {
                setUser(response.user);
                navigate("/home", { replace: true });
            },
        });
    };

    return (
        <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden p-8 md:p-10">
            <form
                id="login-form"
                className="flex flex-col gap-6"
                onSubmit={handleSubmit(onSubmit)}
            >
                {error && (
                    <div className="animate-shake">
                        <Alert type="error" message={error.message} />
                    </div>
                )}

                <div className="space-y-5">
                    <Input
                        label="Nomor Induk Pegawai"
                        {...register("nomor_induk")}
                        id="nip"
                        placeholder="Contoh: 198203..."
                        type="text"
                        inputMode="numeric"
                        error={errors.nomor_induk?.message}
                        className="border-slate-200 text-slate-700 placeholder:text-slate-400 focus:border-blue-500/50"
                        labelClassName="text-slate-500 text-[10px] font-bold uppercase tracking-wider"
                    />

                    <div className="relative">
                        <Input
                            label="Password Keamanan"
                            id="password"
                            {...register("password")}
                            placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                            type={showPassword ? "text" : "password"}
                            error={errors.password?.message}
                            className="border-slate-200 text-slate-700 placeholder:text-slate-400 focus:border-blue-500/50 pr-12"
                            labelClassName="text-slate-500 text-[10px] font-bold uppercase tracking-wider"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-[38px] text-slate-400 hover:text-blue-600 transition-colors p-1"
                        >
                            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-sm tracking-widest uppercase shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    disabled={isPending}
                >
                    {isPending ? (
                        <>
                            <span>Authenticating...</span>
                        </>
                    ) : (
                        "Sign In"
                    )}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;