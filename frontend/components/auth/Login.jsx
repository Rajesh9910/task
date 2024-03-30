import { loginAction } from '@/lib/actions'
import { clientRoutes, toast } from '@/lib/helpers'
import { useRouter } from 'next/navigation'
import { setCookie } from 'nookies'
import React from 'react'
import { useForm } from 'react-hook-form'

const Login = ({ setIsLogin, api }) => {
    const { register, handleSubmit } = useForm()
    const navigate = useRouter()

    const loginHandler = async (data) => {
        const res = await loginAction(data)
        if (res.success) {
            setCookie(null, "user", res.data._id)
            toast(api, "success", res.message)
            navigate.push(clientRoutes.home)
        } else {
            toast(api, "warning", res.message)
        }
    }
    return (
        <>
            <form className='w-full flex flex-col gap-4 mt-16 ' onSubmit={handleSubmit(loginHandler)}>
                <div className='flex flex-col gap-1 w-[82%] lg:w-[75%] mx-auto'>
                    <label htmlFor="email" className='text-[17px] font-medium text-black/80'>Email</label>
                    <input type="email" {...register("email", { required: true })} id='email' className='h-12 rounded px-3 outline-none' placeholder='Enter Email' autoComplete='off' />
                </div>
                <div className='flex flex-col gap-1 w-[82%] lg:w-[75%] mx-auto'>
                    <label htmlFor="password" className='text-[17px] font-medium text-black/80'>Password</label>
                    <input type="text" {...register("password", { required: true })} id='password' className='h-12 rounded px-3 outline-none' placeholder='Enter Password' autoComplete='off' />
                </div>
                <input type="submit" value={"Login"} className='mb-4 mt-12 py-[6px] text-white rounded text-[18px] font-semibold bg-secondary w-[8rem] mx-auto cursor-pointer' />
            </form>
            <p className='text-sm'>or</p>
            <p className='text-[15px] mt-3'>New to TaskHub? <span onClick={() => setIsLogin(false)} className='text-primary font-semibold cursor-pointer'>Sign up</span> now!</p>
        </>
    )
}

export default Login