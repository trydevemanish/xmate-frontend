import FaqCard from "../FaqCard"

const faqcardText = [
  {
    label1:'How does the leader board work ?',
    label2:'leader board shows the top players who have scored most points.'
  },
  {
    label1:'How many matches you can i create ?',
    label2:'You need to complete your previous match to create a new match or delete it.'
  },
  {
    label1:'Will my data be lost if i leave the match ?',
    label2:'Nope your data are stored in the db.'
  },
  {
    label1:'Is there a time limit for a match to be completed ?',
    label2:'Not till now..'
  },
  {
    label1:'Can i see the moves i am making in the match ?',
    label2:'yes.'
  }
]

export default function Faq() {
  return (
    <div className="bg-gradient-to-b py-16 from-white via-violet-200 to-white">
      <p className="font-yatraone text-2xl text-violet-600 text-center py-6">Some Frequently Asked Question.</p>
      <div className="flex flex-col gap-8 items-center place-content-center xs:px-16 md:px-56 py-4">
        {faqcardText.map((data,idx:number) => (
          <FaqCard label1={data?.label1} label2={data?.label2} key={idx} />
        ))}
      </div>
    </div>
  )
}
