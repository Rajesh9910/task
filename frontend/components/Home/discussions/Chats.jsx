import React, { useEffect } from 'react'
import ChatHeader from './ChatHeader'
import Messages from './Messages'
import ChatInput from './ChatInput'
import { useStore } from '@/store/store'

const Chats = ({ allUsers, user, toUser, setTouser, messages }) => {
    return (
        <div className='md:basis-4/6 w-full'>
            <ChatHeader toUser={toUser} setToUser={setTouser} />
            <Messages messages={messages} toUser={toUser} user={user} />
            <ChatInput toUser={toUser} user={user} />
        </div>
    )
}

export default Chats