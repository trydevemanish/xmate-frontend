import { useRef, useState } from "react"

type todoType = {
  text:string;
  completed:boolean;
}

export default function Practice() {
  const [todos,settodo] = useState<todoType[]>([
    {
      text:'hi',
      completed: false
    }
  ])

  const [input, setinput] = useState('')

  function addtodo (text:string) {
    if(todos){
      const newTodo = [...todos,{text:text,completed:false}]
      settodo(newTodo)
    } else{
      const todo = [
        {
          text : text,
          completed:false
        }
      ]
      settodo(todo)
    }
  }


  function deleteTodo(index:number) {
    const allTodos = [...todos]
    allTodos.splice(index,1)
  }

  function toggleTodo (index:number) {
    const allTodos = [...todos]
    const taskTodo = allTodos[index]
    taskTodo.completed = !taskTodo.completed
  }


  return (
    <div>
      {/* <otpComp length={6} /> */}
      <form onSubmit={() => addtodo(input)}>
      <input type="text" value={input} onChange={(e) => setinput(e.target.value)} /> 
      <button type="submit">submit</button>
      </form>

      {
        todos.map((data,i) => (
          <ul key={i}>
            <li>{data.text}</li>
            <li>{data.completed}</li>
          </ul>
        ))
      }

    </div>
  )
}


// function otpComp ({length = 6}){
//   const [otp,setOtp] = useState(Array(length).fill(""))
//   const inputs = useRef([])

//   const handleChange = async(value:any,i:number) => {
//     const newOtp = [...otp];
//     newOtp[i] = value;
//     setOtp(newOtp)

//     if(value && i < length){
//       inputs.current[i+1].focus()
//     }
//   }

//   return(
//     <div>
//       {
//         otp.map((digit,i:any) => (
//           <input 
//             key={i}
//             ref={el => inputs.current[i] = el}
//             value={digit}
//             onChange={(e) => handleChange(e.target.value,i)}
//             max={'1'}
//             style={{ width: "40px", textAlign: "center", fontSize: "20px" }}
//           />
//         ))
//       }
//     </div>
//   )
// }