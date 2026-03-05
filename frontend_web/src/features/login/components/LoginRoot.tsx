import Loginform from "./LoginForm"

const LoginRoot = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-teal-400 gap-8 py-12">
            <p className='text-white font-extrabold text-lg md:text-3xl'>LOGIN ADMIN</p>
            <Loginform />
        </div>
    )
}

export default LoginRoot;