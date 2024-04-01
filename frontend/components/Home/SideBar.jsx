import { clientRoutes } from '@/lib/helpers';
import { useRouter } from 'next/navigation';
import { destroyCookie } from 'nookies';
import React from 'react'
import { FaClipboard, FaTasks, FaUserEdit } from 'react-icons/fa'
import { LuLogOut } from "react-icons/lu";
import { MdOutlineCancel, MdSpaceDashboard } from "react-icons/md";
import { RiChatSmileFill } from "react-icons/ri";

const SideBar = ({ setIsToggle, toggle, showSideBar, setShowSideBar }) => {

    const navigate = useRouter()

    const logoutHandler = () => {
        destroyCookie(null, "user")
        navigate.push(clientRoutes.home)
    }

    return (
        <>
            <div className={`my-3 ms-3 hidden md:block rounded-md shadow w-[20rem] bg-white `}>
                <div className="font-semibold text-primary flex gap-2 items-center text-[22px] py-3 px-7 border-b border-slate-300">
                    <FaClipboard className='inline mb-1 text-[22px]' />
                    TaskHub
                </div>
                <div className='flex flex-col h-[calc(100%-57.8px)] justify-between pb-2'>
                    <div className='flex flex-col'>
                        <p onClick={() => setIsToggle("dashboard")} className={`font-medium border-b cursor-pointer px-5 py-2 hover:text-white hover:bg-third text-primary ${toggle === "dashboard" && "bg-third text-white"}`}>
                            <MdSpaceDashboard className='inline text-[22px] me-2' />
                            Dashboard
                        </p>
                        <p onClick={() => setIsToggle("task")} className={`font-medium border-b cursor-pointer px-5 py-2 hover:text-white hover:bg-third text-primary ${toggle === "task" && "bg-third text-white"}`}>
                            <FaTasks className='inline text-[18px] me-3' />
                            My Tasks
                        </p>
                        <p onClick={() => setIsToggle("discussion")} className={`font-medium border-b cursor-pointer px-5 py-2 hover:text-white hover:bg-third text-primary ${toggle === "discussion" && "bg-third text-white"}`}>
                            <RiChatSmileFill className='inline text-[18px] me-3' />
                            Discussions
                        </p>
                    </div>
                    <div className='flex flex-col'>
                        <p className='font-medium cursor-pointer px-5 py-2 hover:text-white hover:bg-third text-primary'> <FaUserEdit className='inline text-[22px] me-2' /> Edit Profile</p>
                        <p onClick={logoutHandler} className='font-medium cursor-pointer px-5 py-2 hover:text-white hover:bg-third text-primary'><LuLogOut className='inline text-[20px] me-3' /> Logout</p>
                    </div>
                </div>
            </div>
            <div className={`my-3 ms-3 md:hidden absolute top-0 bottom-0 left-0 block rounded-md shadow w-[20rem] origin-left transition-transform duration-300 bg-white ${showSideBar ? "scale-x-1" : "scale-x-0"} `}>
                <div className="font-semibold text-primary flex items-center justify-between text-[22px] py-3 px-4 border-b border-slate-300">
                    <div className='flex gap-2 items-center'>
                        <FaClipboard className='inline mb-1 text-[22px]' />
                        TaskHub
                    </div>
                    <MdOutlineCancel onClick={() => setShowSideBar(false)} className='cursor-pointer' />
                </div>
                <div className='flex flex-col h-[calc(100%-57.8px)] justify-between pb-2'>
                    <div className='flex flex-col'>
                        <p onClick={() => setIsToggle("dashboard")} className={`font-medium border-b cursor-pointer px-5 py-2 hover:text-white hover:bg-third text-primary ${toggle === "dashboard" && "bg-third text-white"}`}>
                            <MdSpaceDashboard className='inline text-[22px] me-2' />
                            Dashboard
                        </p>
                        <p onClick={() => setIsToggle("task")} className={`font-medium border-b cursor-pointer px-5 py-2 hover:text-white hover:bg-third text-primary ${toggle === "task" && "bg-third text-white"}`}>
                            <FaTasks className='inline text-[18px] me-3' />
                            My Tasks
                        </p>
                        <p onClick={() => setIsToggle("discussion")} className={`font-medium border-b cursor-pointer px-5 py-2 hover:text-white hover:bg-third text-primary ${toggle === "discussion" && "bg-third text-white"}`}>
                            <RiChatSmileFill className='inline text-[18px] me-3' />
                            Discussions
                        </p>
                    </div>
                    <div className='flex flex-col'>
                        <p className='font-medium cursor-pointer px-5 py-2 hover:text-white hover:bg-third text-primary'> <FaUserEdit className='inline text-[22px] me-2' /> Edit Profile</p>
                        <p onClick={logoutHandler} className='font-medium cursor-pointer px-5 py-2 hover:text-white hover:bg-third text-primary'><LuLogOut className='inline text-[20px] me-3' /> Logout</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar