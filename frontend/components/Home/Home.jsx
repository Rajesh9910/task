"use client"
import { useEffect, useState } from "react"
import Header from "./Header"
import SideBar from "./SideBar"
import DashBoard from "./DashBoard"
import Discussions from "./Discussions"
import Tasks from "./Tasks"
import { useStore } from "@/store/store"

const Main = ({ user, allUsers, messages }) => {

    const [toggle, setIsToggle] = useState("dashboard")
    const { state: { tasks, messageState }, dispatch } = useStore()
    const [chats, setChats] = useState([])
    const [showSideBar, setShowSideBar] = useState(false)

    useEffect(() => {
        dispatch({ type: "Update_Tasks", payload: user.tasks })
    }, [user.tasks])

    useEffect(() => {
        setChats([...messages, ...messageState].sort((a, b) => a.id - b.id))
    }, [messageState, messages])

    useEffect(() => {
        setShowSideBar(false)
    }, [toggle])

    return (
        <section className='h-dvh bg-third p-3 md:p-5'>
            <div className='bg-slate-200 h-full w-full flex'>
                <SideBar setIsToggle={setIsToggle} toggle={toggle} showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
                <div className="w-full">
                    <Header user={user} showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
                    <div className="w-full h-[calc(100%-92px)] px-3">
                        {
                            toggle === "dashboard" && <DashBoard user={user} tasks={tasks} />
                        }
                        {
                            toggle === "task" && <Tasks user={user} tasks={tasks} />
                        }
                        {
                            toggle === "discussion" && <Discussions allUsers={allUsers.filter(i => i._id !== user._id)} user={user} messages={chats} />
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Main