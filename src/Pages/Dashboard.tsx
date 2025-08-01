import { useState } from 'react'
import Sidebar from "../components/Sidebar"
import Creategame from "../components/Creategame"
import LeaderBoard from "../components/LeaderBoard"
import Welcometoxmate from '../components/Welcometoxmate'
import CreateMatchwithcomputer from '../components/CreateMatchwithcomputer'
import TotalGamePlayed from '../components/TotalGamePlayed'

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
            {clickedMenu == 'play with computer' && <CreateMatchwithcomputer />}
            {clickedMenu == 'create your own match' && <Creategame />}
            {/* {clickedMenu == 'total matches played till' && <TotalGamePlayed />} */}
        </div>
    </div>
  )
}
