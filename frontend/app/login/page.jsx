"use client"
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import { notification } from 'antd'
import Image from 'next/image'
import React, { useState } from 'react'


const page = () => {

    const [isLogin, setIsLogin] = useState(true)

    const [api, contextHolder] = notification.useNotification();

    return (
        <section className='h-dvh bg-third p-5'>
            {contextHolder}
            <div className='bg-slate-200 h-full w-full flex'>
                <div className='basis-1/2 hidden lg:flex justify-center items-center  '>
                    <Image src={'/assets/task.png'} alt='backgorund' width={1000} height={1000} className='w-[70%] h-[70%] object-cover object-center ' />
                </div>
                <div className='w-full lg:basis-1/2 flex items-center justify-center flex-col lg:px-14  bg-slate-300'>
                    <div className='text-center'>
                        <div className='text-primary font-bold text-[32px]'>TaskHub</div>
                        <p className='text-third font-medium text-md'>Centralize Your Task Management</p>
                    </div>
                    {
                        isLogin ?
                            <Login setIsLogin={setIsLogin} api={api} /> : <Register setIsLogin={setIsLogin} api={api} />
                    }
                </div>
            </div>
        </section>
    )
}

export default page