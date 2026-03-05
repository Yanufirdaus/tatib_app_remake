import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Input from "../../../components/ui/Input";
import { useLogin } from "../../auth/hooks/useLogin";
import { LoginSchema, type LoginFormValues } from "../schema/login.schema";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../../../store/auth.store";

const Loginform = () => {
    const [showPassword, setShowPassword] = useState(false);

    const { mutate, isPending, error } = useLogin();

    const { setUser } = useAuthStore()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(LoginSchema)
    })

    const onSubmit = (data: LoginFormValues) => {
        console.log("BISA CUY")
        console.log(data)
        mutate(data, {
            onSuccess: (response) => {
                setUser(response.user)
                console.log("Login success:", response)
            },
            onError: (err) => {
                console.log("Login error:", err)
            }
        })
    }

    return (
        <div className='bg-white rounded-lg mx-6 py-6 md:py-8'>
            <form id="login-form" className='flex flex-col px-6 md:px-12 py-12 md:py-6 gap-6 md:gap-8' onSubmit={handleSubmit(onSubmit)}>
                <Input 
                    label="NIP"
                    {...register("nomor_induk")}
                    id="nip" 
                    placeholder="Masukkan NIP" 
                    type='text' 
                    inputMode='numeric'
                    error={errors.nomor_induk?.message}
                />
                <Input
                    label="Password"
                    id="password" 
                    {...register("password")}
                    placeholder="Masukkan Password" 
                    type= {showPassword ? 'text' : 'password'}
                    icon= {
                        <button
                            type='button'
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            { showPassword ? <FaEyeSlash className='absolute inset-y-0 right-0 h-full mr-2 md:mr-3'/> : <FaEye className='absolute inset-y-0 right-0 h-full mr-2 md:mr-3'/> }
                        </button>
                    }
                    error={errors.password?.message}
                />

                {error && (
                    <p className="text-red-500 text-sm text-center">
                        {error.message}
                    </p>
                )}

                <div className='flex flex-row items-center justify-center pt-6'>
                    <button
                        type='submit'
                        className='bg-red-500 px-4 py-2 rounded-md text-white font-bold'
                        disabled= {isPending}
                    >
                        {isPending ? "Loading..." : "Login"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Loginform;