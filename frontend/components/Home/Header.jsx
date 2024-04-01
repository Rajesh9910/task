"use client"
import { FaRegBell, FaUser } from "react-icons/fa"
import { FaBars } from "react-icons/fa6"

const Header = ({ user, setShowSideBar }) => {
    return (
        <header className='h-14 w-[calc(100%-24px)] px-3  md:ps-3 md:pe-8 bg-white m-3 md:m-3 rounded-md shadow flex justify-between items-center'>
            <div className="w-full flex items-center">
                <input type="text" name="search" placeholder="Search" className="bg-slate-200 hidden md:block outline-none rounded-md h-10 px-3 min-w-[15rem] w-[35%]" />
                <button className="md:hidden text-xl text-primary" onClick={() => setShowSideBar(true)}><FaBars /></button>
                <p className="md:hidden text-xl text-primary ms-3 font-semibold">TaskHub</p>
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