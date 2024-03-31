import { createMsg } from '@/lib/actions';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoSend } from "react-icons/io5";

const ChatInput = ({ user, toUser }) => {

    const { register, handleSubmit, reset } = useForm()
    const [isLoading, setIsLoading] = useState(false)

    const sendMessageHandler = async ({ message }) => {
        setIsLoading(true)
        if (message) {
            await createMsg({ sender: user._id, receiver: toUser._id, message: message, type: "regular" })
            reset()
        }
        setIsLoading(false)
    }

    return (
        <div className='h-[60px] px-3 flex justify-center items-center'>
            <form onSubmit={handleSubmit(sendMessageHandler)} className='w-full h-10 relative'>
                <input type="text" {...register("message")} placeholder='Type message' autoComplete='off' className='h-full rounded-full outline-none w-full px-4 bg-slate-200 shadow pe-12' />
                {
                    !isLoading ?
                        <button type='submit' className='absolute top-1/2 -translate-y-1/2 right-3 text-primary text-2xl'>
                            <IoSend />
                        </button> :
                        <div className='absolute top-1/2 -translate-y-1/2 right-3 text-primary text-2xl'>S</div>
                }
            </form>
        </div>
    )
}

export default ChatInput