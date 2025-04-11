import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Auth/Login'
import { Route,Routes } from 'react-router'

function App() {
  return (
   <main>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
    </Routes>
   </main>
  )
}

export default App
