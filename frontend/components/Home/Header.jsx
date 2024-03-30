"use client"
import { FaRegBell, FaUser } from "react-icons/fa"

const Header = ({ user }) => {
    return (
        <header className='h-14 w-[calc(100%-24px)] px-3 md:ps-3 md:pe-8 bg-white m-2 md:m-3 rounded-md shadow flex justify-between items-center'>
            <div className="w-full">
                <input type="text" name="search" placeholder="Search" className="bg-slate-200 outline-none rounded-md h-10 px-3 w-[35%]" />
            </div>

            <div className='flex gap-2 md:gap-4 text-xl items-center'>
                <FaRegBell className='text-[24px] text-primary' />
                <div className='flex justify-center items-center'>
                    <div className='bg-third border border-white z-10 h-11 w-11 flex items-center justify-center text-white rounded-full'>
                        <FaUser />
                    </div>
                    <p className='text-[16px] hidden md:block bg-third ps-3 text-white pe-3 py-[.8px] rounded -ms-2'>{user.username}</p>
                </div>
            </div>
        </header>
    )
}

export default Header