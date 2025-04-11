import './App.css'
import Home from './Pages/Home'
import { Route,Routes } from 'react-router'

function App() {
  return (
   <main>
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
   </main>
  )
}

export default App
