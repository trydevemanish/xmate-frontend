import { useState } from 'react'
import Sidebar from "../components/Sidebar"
import Creategame from "../components/Creategame"
import LeaderBoard from "../components/LeaderBoard"
import Welcometoxmate from '../components/Welcometoxmate'

export default function Dashboard() {
  const [clickedMenu,setClickedMenu] = useState("")
  return (
    <div className="grid grid-cols-12 min-h-screen bg-gradient-to-b from-white via-violet-100 to-white">
        <div className="col-start-1 col-end-3 border-r border-black pr-1">
            <Sidebar setClickedMenu={setClickedMenu} />
        </div>
        <div className="col-start-3 col-end-13">
            {clickedMenu == "" && <Welcometoxmate setClickedMenu={setClickedMenu} />}
            {clickedMenu == 'leaderboard' && <LeaderBoard />}
            {clickedMenu == 'create your own game' && <Creategame />}
        </div>
    </div>
  )
}
