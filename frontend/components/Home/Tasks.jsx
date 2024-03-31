import React from 'react'
import NoTask from './NoTask'
import TaskStatusComponent from './TaskContainer'

const Tasks = ({ user, tasks }) => {
    if (!tasks?.length) {
        return (
            <NoTask user={user} />
        )
    }
    return <>
        <TaskStatusComponent task={tasks} user_id={user._id} />
    </>
}

export default Tasks