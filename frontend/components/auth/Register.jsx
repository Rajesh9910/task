import { regiserAction } from '@/lib/actions'
import { clientRoutes } from '@/lib/helpers'
import { useStore } from '@/store/store'
import { useRouter } from 'next/navigation'
import { setCookie } from 'nookies'
import React from 'react'
import { useForm } from 'react-hook-form'

const Register = ({ setIsLogin, api }) => {
    const { register, handleSubmit } = useForm()
    const navigate = useRouter()
    const { dispatch, state: { tasks } } = useStore()

    const registerHandler = async (data) => {
        const res = await regiserAction(data)
        console.log(res)
        if (res.success) {
            setCookie(null, "user", res.data._id)
            navigate.push(clientRoutes.home)
            dispatch({ type: "Update_Tasks", payload: res.data.tasks })
        } else {
            console.log(res)
        }
    }

    return (
        <>
            <form className='w-full flex flex-col gap-4 mt-12 ' onSubmit={handleSubmit(registerHandler)}>
                <div className='flex flex-col gap-1 w-[82%] lg:w-[75%] mx-auto'>
                    <label htmlFor="username" className='text-[17px] font-medium text-black/80'>Username</label>
                    <input type="text" {...register("username", { required: true })} id='username' className='h-12 rounded px-3 outline-none' placeholder='Enter Username' autoComplete='off' />
                </div>
                <div className='flex flex-col gap-1 w-[82%] lg:w-[75%] mx-auto'>
                    <label htmlFor="email" className='text-[17px] font-medium text-black/80'>Email</label>
                    <input type="email" {...register("email", { required: true })} id='email' className='h-12 rounded px-3 outline-none' placeholder='Enter Email' autoComplete='off' />
                </div>
                <div className=' w-[82%] lg:w-[75%] mx-auto flex flex-col lg:flex-row gap-3'>
                    <div className='flex flex-col gap-1 w-full lg:w-[calc(50%-6px)]'>
                        <label htmlFor="password" className='text-[17px] font-medium text-black/80'>Password</label>
                        <input type="password" {...register("password", { required: true })} id='password' className='h-12 rounded px-3 outline-none' placeholder='Enter Password' autoComplete='off' />
                    </div>
                    <div className='flex flex-col gap-1 w-full lg:w-[calc(50%-6px)]'>
                        <label htmlFor="cpassword" className='text-[17px] font-medium text-black/80'>Confirm Password</label>
                        <input type="password" {...register("cpassword", { required: true })} id='cpassword' className='h-12 rounded px-3 outline-none' placeholder='Confirm Password' autoComplete='off' />
                    </div>
                </div>
                <input type="submit" value={"Sign Up"} className='mb-4 mt-8 py-[6px] text-white rounded text-[18px] font-semibold bg-secondary w-[8rem] mx-auto cursor-pointer' />
            </form>
            <p className='text-sm'>or</p>
            <p className='text-[15px] mt-3'>Already have an account? <span onClick={() => setIsLogin(true)} className='text-primary font-semibold cursor-pointer'>Login</span> now!</p>
        </>
    )
}

export default Register