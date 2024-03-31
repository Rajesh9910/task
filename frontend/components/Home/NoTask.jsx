import { createTask } from '@/lib/actions';
import { toast } from '@/lib/helpers';
import { useStore } from '@/store/store';
import { ConfigProvider, DatePicker, Modal, Select, notification } from 'antd'
import dayjs from 'dayjs';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { MdOutlineCancel } from "react-icons/md";

const NoTask = ({ user }) => {

    const [open, setOpen] = useState(false);
    const { register, handleSubmit, control, reset } = useForm()
    const [api, contextHolder] = notification.useNotification()
    const { dispatch, state: { tasks } } = useStore()
    const [isLoading, setIsLoading] = useState(false)

    const showModal = () => {
        setOpen(true);
    };


    const options = [
        {
            value: 'personal',
            label: 'Personal',
        },
        {
            value: 'project',
            label: 'Project',
        }
    ]

    const submitHandler = async (data) => {
        setIsLoading(true)
        data = { ...data, startDate: data.startDate.valueOf(), endDate: data.endDate.valueOf(), id: user._id }
        const res = await createTask(data)
        reset()
        if (res.success) {
            setOpen(false);
            toast(api, "success", res.message)
            dispatch({ type: "Update_Tasks", payload: res.data.tasks })
            setIsLoading(false)
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
                    width={820}
                >
                    <div className='w-full'>
                        <div className=' border-t-[6px] border-primary rounded-t-md w-full text-xl justify-between bg-third/20 flex items-center pb-[2px] px-5 text-primary font-semibold h-14'>
                            Create New task
                            <MdOutlineCancel className='text-2xl cursor-pointer' onClick={() => setOpen(false)} />
                        </div>
                        <form className='p-4 flex-col flex gap-2' onSubmit={handleSubmit(submitHandler)}>
                            <div className='w-full flex flex-col gap-1'>
                                <label htmlFor="title" className='text-[18px] font-medium'>Title</label>
                                <input type="text" {...register("title")} id="title" className='outline-none h-10 border px-3 border-slate-400 rounded-md text-[17px]' placeholder='Enter title here' />
                            </div>
                            <div className='w-full flex flex-col gap-1'>
                                <label htmlFor="description" className='text-[18px] font-medium'>Description</label>
                                <textarea {...register("description")} id="description" cols="30" rows="3" className='w-full outline-none text-[17px] border border-slate-400 rounded-md px-3 py-2' placeholder='Description of your task '></textarea>
                            </div>
                            <div className='grid w-full grid-cols-3 gap-3'>
                                <div className='w-full flex flex-col gap-1'>
                                    <p className='text-[18px] font-medium'>Start Date</p>
                                    <Controller
                                        name="startDate"
                                        control={control}
                                        render={({ field }) => (
                                            <DatePicker className='w-full !border !border-slate-400 !h-10'
                                                {...field}
                                                dateFormat="YYYY/MM/DD" />
                                        )}
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-1'>
                                    <p className='text-[18px] font-medium'>End Date</p>

                                    <Controller
                                        name="endDate"
                                        control={control}
                                        render={({ field }) => (
                                            <DatePicker className='w-full !border !border-slate-400 !h-10'
                                                {...field}
                                                // minDate={new Date()}
                                                dateFormat="YYYY/MM/DD"
                                            />
                                        )}
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-1'>
                                    <p className='text-[18px] font-medium'>Task Type</p>
                                    <Controller
                                        name="type"
                                        control={control}
                                        render={({ field }) => (
                                            <Select {...field} options={options} defaultValue={"Personal"} className='w-full !border !border-slate-400 !h-10 !rounded-md !active:border-none !focus:border-none !hover:border-none' />
                                        )}
                                    />

                                </div>
                            </div>
                            <div className='w-full flex justify-center items-center gap-4 mt-8'>
                                <button type='button' onClick={() => setOpen(false)} className='h-9 border w-[7rem] font-medium  text-[16px] rounded-full'>Cancel</button>
                                <button type={isLoading ? "button" : 'submit'} className={`h-9 border w-[7rem] bg-primary text-white text-[16px] rounded-full ${isLoading && "pointer-events-none cursor-auto"}`}>Save</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </ConfigProvider>

            <div className="w-full py-8  flex justify-center text-2xl flex-col items-center gap-4">
                No Tasks Created
                <button onClick={showModal} className='bg-secondary h-10 w-10 flex justify-center items-center text-white rounded-full'><FaPlus /></button>
            </div>
        </>
    )
}

export default NoTask