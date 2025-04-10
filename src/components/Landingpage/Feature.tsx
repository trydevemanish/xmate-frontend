import { BiBrain, BiCrown,BiUser } from "react-icons/bi"
import FeatureCard from "../FetaureCard"

const features = [
    {
      icon: BiCrown,
      title: 'Leaderboard Glory',
      description:
        "Track your wins and see how you stack up against other players on the global leaderboard. Who will rise to the top?",
    },
    {
        icon: BiUser,
        title: 'Peer-to-Peer Challenges',
        description:
          "Create a custom chess match link and send it to your friend or peer. Start playing instantly in a seamless, user-friendly interface.",
    },
    {
        icon: BiCrown,
        title: 'Cross-Platform',
        description:
          "Play from anywhere, on any device. ChessMate is designed to work seamlessly across desktops, tablets, and smartphones.",
    },
]

export default function Feature() {
  return (
    <div className="py-16 px-28 bg-gradient-to-b from-white to-violet-100">
        <div className="flex flex-col gap-5 justify-center items-center pt-16">
            <p className="text-center border px-8 py-1 inline-block bg-violet-500 text-sm text-white rounded font-manrope shadow-xl animate-bounce shadow-violet-200 hover:bg-violet-400">Create your first game.</p>
            <p className="text-3xl font-bold py-8 font-cabinsketch flex gap-2">
                <BiBrain className="size-8 text-violet-500" />
                <span> Where <span className="text-violet-500">Strategy</span> Meets Fun – Play Chess Like Never Before!"</span>
            </p>
            <div className="flex gap-4 py-2">
                {features.map((data,idx:number) => (
                    <FeatureCard key={idx} title={data?.title} icon={data?.icon} description={data?.description} />
                ))}
            </div>
        </div>
    </div>
  )
}
