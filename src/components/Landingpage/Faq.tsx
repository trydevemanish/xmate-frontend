import FaqCard from "../FaqCard"

const faqcardText = [
  {
    label1:'how does the leader board work?',
    label2:'leader board work how much matche syour have playes.'
  },
  {
    label1:'hi',
    label2:'hey'
  },
  {
    label1:'ok1',
    label2:'this is ok1'
  },
  {
    label1:'ok3',
    label2:'this is ok2'
  },
  {
    label1:'ok5',
    label2:'this is ok3'
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
