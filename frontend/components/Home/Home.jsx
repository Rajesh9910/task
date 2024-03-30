"use client"
import { useState } from "react"
import Header from "./Header"
import SideBar from "./SideBar"
import DashBoard from "./DashBoard"
import Discussions from "./Discussions"
import Tasks from "./Tasks"

const Main = ({ user }) => {

    const [toggle, setIsToggle] = useState("dashboard")

    return (
        <section className='h-dvh bg-third p-3 md:p-5'>
            <div className='bg-slate-200 h-full w-full flex'>
                <SideBar user={user} setIsToggle={setIsToggle} toggle={toggle} />
                <div className="w-full">
                    <Header user={user} />
                    <div className="w-full h-[calc(100%-92px)] px-3">
                        {
                            toggle === "dashboard" && <DashBoard user={user} />
                        }
                        {
                            toggle === "task" && <Tasks user={user} />
                        }
                        {
                            toggle === "discussion" && <Discussions />
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Main