import LeaderBoard from "../components/LeaderBoard"
import Sidebar from "../components/Sidebar"

export default function Dashboard() {
  return (
    <div className="grid grid-cols-12 min-h-screen bg-gradient-to-b from-white via-violet-100 to-white">
        <div className="col-start-1 col-end-3 border-r border-black pr-1">
            <Sidebar />
        </div>
        <div className="col-start-3 col-end-13 pl-2">
            <LeaderBoard />
        </div>
    </div>
  )
}
