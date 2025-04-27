import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Auth/Login'
import { Route,Routes } from 'react-router'
import Register from './Pages/Auth/Register'
import Dashboard from './Pages/Dashboard'
import Profile from './components/Profile'
import Challenge from './Pages/Challenge'
import { ToastContainer } from 'react-toastify';
import Randommatch from './Pages/Randommatch'


function App() {
  return (
   <main>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/u/profile' element={<Profile />} />
      <Route path='/challenge/u/:gameid' element={<Challenge />} />
      <Route path='/random/match' element={<Randommatch />} />
      </Routes>
    <ToastContainer />
   </main>
  )
}

export default App
