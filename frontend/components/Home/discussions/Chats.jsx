import React from 'react'
import ChatHeader from './ChatHeader'
import Messages from './Messages'
import ChatInput from './ChatInput'

const Chats = ({ allUsers, user, toUser, setTouser, messages }) => {
    return (
        <div className='basis-4/6 '>
            <ChatHeader toUser={toUser} />
            <Messages messages={messages} toUser={toUser} user={user} />
            <ChatInput toUser={toUser} user={user} />
        </div>
    )
}

export default Chats