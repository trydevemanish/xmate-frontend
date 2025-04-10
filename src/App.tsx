import './App.css'
import About from './components/Landingpage/About'
import Feature from './components/Landingpage/Feature'
import Header from './components/Landingpage/Header'
import Navbar from './components/Landingpage/Navbar'
import Scrollbar from './components/Landingpage/Scrollbar'

function App() {
  return (
   <main>
    <Navbar />
    <Header />
    <About />
    <Feature />
    <Scrollbar />
   </main>
  )
}

export default App
