import React from 'react'
import NoTask from './NoTask'

const Tasks = ({ user }) => {
    if (!user.tasks.length) {
        return (
            <NoTask user={user} />
        )
    }
    return <div>Tasks</div>
}

export default Tasks