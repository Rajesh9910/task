import React from 'react'
import { FaPlus } from 'react-icons/fa6'

const Profiles = ({ allusers, user, toUser, setTouser }) => {

    return (
        <div className='basis-2/6 border-r border-slate-300'>
            <div className='py-3 px-3 text-[20px] font-semibold text-primary border-b border-slate-300 flex justify-between'>
                <p>Team Members</p>
                <button>
                    <FaPlus />
                </button>
            </div>
            <div className='p-1 overflow-y-auto h-[calc(100%-55px)] scroll-hidden'>
                {
                    allusers.map((i, inx) => {
                        return (
                            <div onClick={() => setTouser(i)} className={`m-2 cursor-pointer shadow border p-2 h-16 rounded-md flex justify-between ${toUser?._id === i._id ? "bg-primary/70 text-white" : "bg-slate-100/50 "}`} key={inx}>
                                <div className='flex gap-2'>
                                    <div className={`h-12 w-12 rounded-full bg-slate-200 shadow flex justify-center items-center capitalize text-[18px] text-primary font-medium `}>{i.username.charAt(0)}</div>
                                    <div className='flex flex-col justify-center'>
                                        <p className='capitalize text-[15px] font-medium'>{i.username}</p>
                                        <p className={`text-[13px] ${toUser?._id === i._id ? "text-white/60" : "text-black/60"} `}>Latest Message</p>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-end items-end gap-2'>
                                    <p className='text-sm me-1'>just now</p>
                                    <p className={`h-5 flex items-center justify-center w-5 me-2 text-sm rounded-full ${toUser?._id === i._id ? "bg-white text-primary" : "text-white bg-primary/70"}`}>2</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Profiles