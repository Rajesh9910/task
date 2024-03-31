"use client"
import NoTask from './NoTask'
import { FaCircleCheck, FaRegCircleCheck } from "react-icons/fa6";
import NewTask from './NewTask';
import NewReminder from './NewReminder';
import { AiFillDelete } from 'react-icons/ai';
import { MdOutlinePendingActions } from 'react-icons/md';
import { FaTasks } from 'react-icons/fa';


const Icon = ({ status }) => {
    if (status === "completed") {
        return <FaCircleCheck fill="green" />
    } else if (status === "deleted") {
        return <AiFillDelete className='text-red-800 text-[18px]' />
    } else if (status === "progress") {
        return <MdOutlinePendingActions fill='orange' className='text-[20px]' />
    } else {
        return <FaTasks className='text-slate-800' />
    }
}

const DashBoard = ({ user, tasks }) => {
    if (!tasks?.length) {
        return (
            <NoTask user={user} />
        )
    }

    const checkDate = (date) => {
        const isDay = new Date(date).getDate() === new Date().getDate()
        const isMon = new Date(date).getMonth() === new Date().getMonth()
        const isYear = new Date(date).getFullYear() === new Date().getFullYear()
        return (isDay && isMon && isYear)
    }
    return (
        <div className='w-full flex flex-wrap justify-between '>
            <div className='basis-1/3 pe-2 '>
                <div className='h-full bg-white rounded-md shadow'>
                    <div className='flex justify-between items-center px-3 py-2 border-b border-slate-400 font-semibold'>
                        <p className=' '>My Tasks <span className='font-normal'>({user.tasks.length})</span></p>
                        <NewTask user={user} />
                    </div>
                    <div className='w-full h-[18rem] overflow-y-auto scroller' >
                        {
                            tasks.map((i, inx) => {
                                checkDate(i.endDate)
                                return (
                                    <div key={inx} className={`w-full px-3 py-2 flex justify-between items-center border-b ${i.status === "completed" && "bg-green-100/50"}  ${i.status === "progress" && "bg-yellow-200/40"}  ${i.status === "deleted" && "bg-red-100"}`}>
                                        <div className='flex gap-3 items-center'>
                                            <p>{inx + 1}</p>
                                            <p className='capitalize'>{i.title}</p>
                                        </div>
                                        <Icon status={i.status} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='basis-1/3 px-2'>
                <div className='bg-white rounded-md shadow'>
                    <p className=' px-3 py-2 border-b border-slate-400 font-semibold'>Today's Deadlines <span className='font-normal'>({tasks.filter((i) => checkDate(i.endDate)).length})</span></p>
                    <div className='w-full h-[18rem] overflow-y-auto scroller'>
                        {
                            tasks.filter((i) => checkDate(i.endDate)).length ?
                                tasks.filter((i) => checkDate(i.endDate)).map((i, inx) => {
                                    return (
                                        <div key={inx} className={`w-full px-3 py-2 flex justify-between items-center border-b ${i.status === "completed" && "bg-green-100/50"}  ${i.status === "progress" && "bg-yellow-200/40"}  ${i.status === "deleted" && "bg-red-100"}`}>
                                            <div className='flex gap-3 items-center'>
                                                <p>{inx + 1}</p>
                                                <p className='capitalize'>{i.title}</p>
                                            </div>
                                            <Icon status={i.status} />
                                        </div>
                                    )
                                }) : <div className='w-full p-2 text-sm flex justify-center'>No tasks found</div>
                        }
                    </div>
                </div>
            </div>
            <div className='basis-1/3 ps-2'>
                <div className='bg-white rounded-md shadow'>
                    <div className='flex justify-between items-center px-3 py-2 border-b border-slate-400 font-semibold'>
                        <p className='  border-slate-400 font-semibold'>Reminders <span className='font-normal'>({tasks.filter((i) => i.reminderDate).length})</span></p>
                        <NewReminder user={user} tasks={tasks} />
                    </div>
                    <div className='w-full h-[18rem] overflow-y-auto scroller '>
                        {
                            tasks.filter((i) => i.reminderDate).length ?
                                tasks.filter((i) => i.reminderDate).map((i, inx) => {
                                    return (
                                        <div key={inx} className={`w-full px-3 py-2 flex justify-between items-center border-b ${i.status === "completed" && "bg-green-100/50"}  ${i.status === "progress" && "bg-yellow-200/40"}  ${i.status === "deleted" && "bg-red-100"}}`}>
                                            <div className='flex gap-3 items-center'>
                                                <p>{inx + 1}</p>
                                                <p className='capitalize'>{i.title}</p>
                                            </div>
                                            <p>2 min left</p>
                                        </div>
                                    )
                                }) : <div className='w-full p-2 text-sm flex justify-center'>
                                    <p>No reminders found</p>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoard