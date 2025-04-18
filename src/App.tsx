import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Auth/Login'
import { Route,Routes } from 'react-router'
import Register from './Pages/Auth/Register'
import Dashboard from './Pages/Dashboard'
import Profile from './components/Profile'

function App() {
  return (
   <main>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/u/profile' element={<Profile />} />
    </Routes>
   </main>
  )
}

export default App
