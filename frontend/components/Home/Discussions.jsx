import React, { useEffect, useState } from 'react'
import Profiles from './discussions/Profiles'
import Chats from './discussions/Chats'
import { RiChatSmileFill } from 'react-icons/ri'
import { useStore } from '@/store/store'

const Discussions = ({ allUsers, user, messages }) => {

    const [toUser, setToUser] = useState(null)
    const [myChats, setMyChats] = useState([])
    const { socket, dispatch } = useStore()
    const [users, setUsers] = useState([])
    const [unreadMsgs, setUnreadMsgs] = useState([])
    const [isSidePanel, setIsSidePanel] = useState(false)

    useEffect(() => {
        if (!toUser) return
        setMyChats(messages.filter(i => (i.receiver === toUser._id || i.sender === toUser._id)))
    }, [toUser, messages])

    const receiveMsgHandler = (obj) => {
        if (obj.receiver === user._id || obj.sender === user._id) {
            dispatch({ type: "Add_Message", payload: obj })
        }
        if (obj.receiver === user._id) {
            if (obj.sender !== toUser?._id) {
                setUnreadMsgs(prevUnreadMsgs => {
                    const updatedUnreadMsgs = [...prevUnreadMsgs];
                    const existingIndex = updatedUnreadMsgs.findIndex(item => item.id === obj.sender);

                    if (existingIndex !== -1) {
                        updatedUnreadMsgs[existingIndex].count += 1;
                    } else {
                        updatedUnreadMsgs.push({ id: obj.sender, count: 1 });
                    }

                    return updatedUnreadMsgs;
                });
            }
        }
    }

    useEffect(() => {
        if (!socket) return;
        socket.on("get-msg", receiveMsgHandler)
        return () => {
            socket.off("get-msg", receiveMsgHandler)
        }
    }, [toUser])

    useEffect(() => {
        const sortedUsers = [...allUsers].sort((a, b) => {
            const lastMessageA = messages.filter(message => message.sender === a._id || message.receiver === a._id)
                .sort((m1, m2) => m2.id - m1.id)[0];

            const lastMessageB = messages.filter(message => message.sender === b._id || message.receiver === b._id)
                .sort((m1, m2) => m2.id - m1.id)[0];

            if (!lastMessageA) return 1;
            if (!lastMessageB) return -1;

            return lastMessageB.id - lastMessageA.id;
        });
        setUsers(sortedUsers)
    }, [allUsers, messages]);

    useEffect(() => {
        setUnreadMsgs((prev) => {
            const updatedUnreadMsgs = [...prev];
            const existingIndex = updatedUnreadMsgs.filter(item => item.id !== toUser._id);
            return existingIndex
        })
    }, [toUser])


    return (
        <>
            <div className='h-full bg-white shadow rounded-md hidden md:flex'>
                <Profiles allusers={users} user={user} setTouser={setToUser} toUser={toUser} messages={messages} unreadCount={unreadMsgs} />
                {
                    toUser ? <Chats allUsers={allUsers} user={user} setTouser={setToUser} toUser={toUser} messages={myChats} />
                        :
                        <div className='basis-4/6 p-2 w-full h-full flex justify-center flex-col items-center gap-y-5'>
                            <RiChatSmileFill className='inline text-[4.5rem] text-primary' />
                            <p className='w-[20rem] text-center'>Welcome to Discussions! Start a conversation by selecting a user on the left.</p>
                        </div>
                }
            </div>
            <div className='h-full w-full bg-white shadow rounded-md md:hidden flex'>
                {!toUser ?
                    <Profiles allusers={users} user={user} setTouser={setToUser} toUser={toUser} messages={messages} unreadCount={unreadMsgs} /> :
                    <>
                        {
                            toUser ? <Chats allUsers={allUsers} user={user} setTouser={setToUser} toUser={toUser} messages={myChats} />
                                :
                                <div className=' p-2 w-full h-full flex justify-center flex-col items-center gap-y-5'>
                                    <RiChatSmileFill className='inline text-[4.5rem] text-primary' />
                                    <p className='w-[20rem] text-center'>Welcome to Discussions! Start a conversation by selecting a user on the left.</p>
                                </div>
                        }
                    </>
                }
            </div>
        </>
    )
}

export default Discussions