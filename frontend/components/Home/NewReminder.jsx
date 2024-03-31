import { createTask, updateTask } from '@/lib/actions';
import { toast } from '@/lib/helpers';
import { ConfigProvider, DatePicker, Modal, Select, notification } from 'antd'
import dayjs from 'dayjs';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { MdOutlineCancel } from "react-icons/md";

const NewReminder = ({ user, tasks }) => {

    const [open, setOpen] = useState(false);
    const { handleSubmit, control, reset } = useForm()
    const [api, contextHolder] = notification.useNotification()

    const showModal = () => {
        setOpen(true);
    };


    const options = tasks.filter(i => (i.status !== "completed" && i.status !== "deleted")).map((i) => {
        return { value: i._id, label: i.title }
    })

    const submitHandler = async (data) => {
        data = { ...data, reminderDate: data.reminderDate.valueOf(), user_id: user._id }
        const res = await updateTask(data)
        if (res.success) {
            toast(api, "success", res.message)
            reset()
            setOpen(false)
        }
    }


    return (
        <>
            {contextHolder}
            <ConfigProvider
                theme={{
                    components: {
                        Modal: {
                            titleColor: "#070F2B",
                            titleFontSize: "22px",
                            padding: 0
                        },
                    }
                }}
            >

                <Modal
                    closeIcon={false}
                    centered={true}
                    open={open}
                    footer={null}
                >
                    <div className='w-full'>
                        <div className=' border-t-[6px] border-primary rounded-t-md w-full text-xl justify-between bg-third/20 flex items-center pb-[2px] px-5 text-primary font-semibold h-14'>
                            Create New Reminder
                            <MdOutlineCancel className='text-2xl cursor-pointer' onClick={() => setOpen(false)} />
                        </div>
                        <form className='p-4 flex-col flex gap-2' onSubmit={handleSubmit(submitHandler)}>
                            <div className='w-full flex flex-col gap-1'>
                                <label htmlFor="title" className='text-[18px] font-medium'>Select Task</label>
                                <Controller
                                    name="task_id"
                                    control={control}

                                    render={({ field }) => (
                                        <Select {...field} placeholder="Select task" options={options} className='w-full !border !border-slate-400 !h-10 !rounded-md !active:border-none !focus:border-none !hover:border-none' />
                                    )}
                                />
                            </div>

                            <div className='w-full '>
                                <div className='w-full flex flex-col gap-1'>
                                    <p className='text-[18px] font-medium'>Reminding Time</p>
                                    <Controller
                                        name="reminderDate"
                                        control={control}
                                        render={({ field }) => (
                                            <DatePicker className='w-full !border !border-slate-400 !h-10'
                                                {...field}
                                                showTime={true}
                                                dateFormat="YYYY/MM/DD"
                                            />
                                        )}
                                    />
                                </div>

                            </div>
                            <div className='w-full flex justify-center items-center gap-4 mt-8'>
                                <button type='button' onClick={() => setOpen(false)} className='h-9 border w-[7rem] font-medium  text-[16px] rounded-full'>Cancel</button>
                                <button type='submit' className='h-9 border w-[7rem] bg-primary text-white text-[16px] rounded-full'>Save</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </ConfigProvider>

            <div className="bg-secondary rounded-full p-1">
                <button onClick={showModal} className='  flex justify-center items-center text-white '>
                    <FaPlus className='text-[12px]' />
                </button>
            </div>
        </>
    )
}

export default NewReminder