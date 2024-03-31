import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FaCheckCircle, FaTasks } from 'react-icons/fa';
import { MdOutlinePendingActions } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { updateTask } from '@/lib/actions';
import { notification } from 'antd';
import { toast } from '@/lib/helpers';
import { useStore } from '@/store/store';

const Task = ({ id, content, status }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'task',
        item: { id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={drag}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            className={`p-2 flex justify-between items-center rounded-md cursor-grab m-2 shadow border capitalize ${status === "completed" ? "bg-green-300/50 border border-green-700" : status === "progress" ? "bg-yellow-200/50 border-yellow-300" : status === "deleted" ? "bg-red-300 border-red-600" : "bg-slate-100/50 border-slate-300"}`}
        >
            {content}
            {
                status === "completed" && <FaCheckCircle fill='green' className='text-[18px]' />
            }
            {
                status === "progress" && <MdOutlinePendingActions fill='orange' className='text-[20px]' />
            }
            {
                status === "deleted" && <AiFillDelete className='text-red-800 text-[18px]' />
            }
            {
                status === "todo" && <FaTasks className='text-slate-800' />
            }
        </div>
    );
};

const TaskStatusComponent = ({ task, user_id }) => {

    const { dispatch } = useStore()

    const [tasks, setTasks] = useState(task)
    const [api, contextHolder] = notification.useNotification()

    const moveTask = (dragId, status) => {
        const updatedTasks = [...tasks];
        const draggedTask = updatedTasks.find(i => i._id === dragId);
        let final = { ...draggedTask, status: status }
        const index = updatedTasks.findIndex((i) => i._id === final._id)
        updatedTasks[index] = final
        dispatch({ type: "Update_Tasks", payload: updatedTasks })
        setTasks(updatedTasks)
    };

    const upDateTask = async (task_id, status) => {
        const res = await updateTask({ task_id: task_id, user_id: user_id, status: status })
    }

    const TaskDropTarget = ({ status }) => {
        const [{ isOver }, drop] = useDrop({
            accept: 'task',
            drop: (item, monitor) => {
                const dragId = item.id;
                upDateTask(dragId, status)
                moveTask(dragId, status)
            },
        });

        const filteredTasks = tasks.filter(task => task.status === status);
        return (
            <div ref={drop} className=" basis-1/4">
                <h2 className='bg-slate-400 text-white text-center text-[18px] font-medium capitalize p-2'>{status}</h2>
                <div className=' h-[calc(100%-40px)]'>
                    {filteredTasks.map((task, index) => (
                        <Task key={index} id={task._id} content={task.title} status={task.status} />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <DndProvider backend={HTML5Backend}>
            {contextHolder}
            <div className="w-full h-full flex justify-between shadow bg-white">
                <TaskDropTarget status="todo" />
                <TaskDropTarget status="progress" />
                <TaskDropTarget status="completed" />
                <TaskDropTarget status="deleted" />
            </div>
        </DndProvider>
    );
};

export default TaskStatusComponent;
