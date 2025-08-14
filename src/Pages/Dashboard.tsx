import { useState } from 'react'
import Sidebar from "../components/Sidebar"
import Creategame from "../components/Creategame"
import LeaderBoard from "../components/LeaderBoard"
import Welcometoxmate from '../components/Welcometoxmate'
import CreateMatchwithcomputer from '../components/CreateMatchwithcomputer'

export default function Dashboard() {
  const [clickedMenu,setClickedMenu] = useState("")
  const [showSidebar,setShowSidebar] = useState(false)

  return (
    <div className="md:grid md:grid-cols-12 min-h-screen bg-gradient-to-b from-white via-violet-100 to-white">
      <div
        className={`
          md:col-start-1 md:col-end-3
          border-black border-r
          md:pr-1
          md:block
          md:w-auto 
          xs:max-w-72
          md:static md:translate-x-0
          fixed top-0 left-0 h-full w-full z-50 bg-white shadow-lg
          transition-transform duration-300 ease-in-out
          md:transform-none
          ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <Sidebar setClickedMenu={setClickedMenu} closeSidebar={() => setShowSidebar(false)} />
      </div>
      <div className="md:col-start-3 md:col-end-13">
          {clickedMenu == "" && <Welcometoxmate setClickedMenu={setClickedMenu}  setShowSidebar={setShowSidebar}  />}
          {clickedMenu == 'leaderboard' && <LeaderBoard setShowSidebar={setShowSidebar} />}
          {clickedMenu == 'play with computer' && <CreateMatchwithcomputer setShowSidebar={setShowSidebar} />}
          {clickedMenu == 'create your own match' && <Creategame setShowSidebar={setShowSidebar} />}
      </div>
    </div>
  )
}


      {/* <div className="col-start-1 col-end-3 border-r border-black pr-1">
          <Sidebar setClickedMenu={setClickedMenu} closeSidebar={() => setShowSidebar(false)} />
      </div> */}
