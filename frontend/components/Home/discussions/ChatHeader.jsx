import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";

const ChatHeader = ({ toUser }) => {
    return (
        <div className='flex h-[54.8px] px-5 border-b border-slate-300 items-center justify-between'>
            <div className='flex gap-x-2'>
                <div className={`h-10 w-10 rounded-full bg-slate-200 shadow flex justify-center items-center capitalize text-[18px] text-primary font-medium `}>{toUser.username.charAt(0)}</div>
                <div className='flex flex-col justify-center'>
                    <p className='capitalize text-[15px] font-semibold text-primary'>{toUser.username}</p>
                    <p className='text-[12px] tracking-wide'>typing...!</p>
                </div>
            </div>
            <div className='text-xl text-primary cursor-pointer'>
                <BsThreeDotsVertical />
            </div>
        </div>
    )
}

export default ChatHeader