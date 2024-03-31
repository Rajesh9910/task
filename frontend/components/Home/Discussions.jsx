import React, { useEffect, useState } from 'react'
import Profiles from './discussions/Profiles'
import Chats from './discussions/Chats'
import { RiChatSmileFill } from 'react-icons/ri'

const Discussions = ({ allUsers, user, messages }) => {

    const [toUser, setToUser] = useState(null)

    const [myChats, setMyChats] = useState([])

    useEffect(() => {
        if (!toUser) return
        setMyChats(messages.filter(i => (i.receiver === toUser._id || i.sender === toUser._id)))
    }, [toUser])

    return (
        <div className='h-full bg-white shadow rounded-md flex '>
            <Profiles allusers={allUsers} user={user} setTouser={setToUser} toUser={toUser} />
            {
                toUser ? <Chats allUsers={allUsers} user={user} setTouser={setToUser} toUser={toUser} messages={myChats} />
                    :
                    <div className='basis-4/6 p-2 w-full h-full flex justify-center flex-col items-center gap-y-5'>
                        <RiChatSmileFill className='inline text-[4.5rem] text-primary' />
                        <p className='w-[20rem] text-center'>Welcome to Discussions! Start a conversation by selecting a user on the left.</p>
                    </div>
            }
        </div>
    )
}

export default Discussions