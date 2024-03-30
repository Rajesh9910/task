import { ConfigProvider, Modal } from 'antd'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';

const NoTask = ({ user }) => {

    const [open, setOpen] = useState(false);
    const { register, handleSubmit } = useForm()


    const showModal = () => {
        setOpen(true);
    };

    return (
        <>
            <ConfigProvider
                theme={{
                    components: {
                        Modal: {
                            titleColor: "#070F2B",
                            titleFontSize: "22px"
                        },
                    },
                }}
            >

                <Modal
                    closeIcon={false}
                    centered={true}
                    open={open}
                    footer={null}
                    width={820}
                >
                    <p></p>
                    <form className=''>
                        <div className='w-full flex flex-col'>
                            <label htmlFor="title">Title</label>
                            <input type="text" {...register("title")} id="title" />
                        </div>
                    </form>
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