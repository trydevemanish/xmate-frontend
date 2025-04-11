import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Auth/Login'
import { Route,Routes } from 'react-router'
import Register from './Pages/Auth/Register'

function App() {
  return (
   <main>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
   </main>
  )
}

export default App
