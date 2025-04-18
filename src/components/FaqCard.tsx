import { useState } from "react"

export default function FaqCard({label1,label2,classNamelabel1,classNamelabel2}:{label1:string,label2:string,classNamelabel1?:string,classNamelabel2?:string}) {
    const [showtext,setShowText] = useState(false)

  return (
    <div className="flex flex-col w-full">
        <p className={`cursor-pointer ${classNamelabel1}  border-b`} onClick={() => setShowText(prev => !prev)}>{label1}</p>
        <div
          className={`transition-all duration-300 overflow-hidden ${
            showtext ? "max-h-56 opacity-100 mt-2" : "max-h-0 opacity-0"
          }`}
        >
          <p className={`text-gray-600 ${classNamelabel2} `} onClick={() => setShowText(prev => !prev)}>{label2}</p>
        </div>
    </div>
  )
}
