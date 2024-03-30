import React from 'react'
import NoTask from './NoTask'

const DashBoard = ({ user }) => {
    if (!user.tasks.length) {
        return (
            <NoTask user={user} />
        )
    }
    return (
        <div>DashBoard</div>
    )
}

export default DashBoard