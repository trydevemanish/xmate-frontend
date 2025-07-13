import About from '../components/Landingpage/About'
import Faq from '../components/Landingpage/Faq'
import Feature from '../components/Landingpage/Feature'
import Footer from '../components/Landingpage/Footer'
import Header from '../components/Landingpage/Header'
import Info from '../components/Landingpage/Info'
import Navbar from '../components/Landingpage/Navbar'
import Scrollbar from '../components/Landingpage/Scrollbar'
import Faqtop from '../components/Landingpage/Faqtop'

export default function Home() {
  return (
    <div>
        <Navbar />
        <Header />
        <About />
        <Feature />
        <Scrollbar />
        <Info />
        <Faq />
        <Faqtop />
        <Footer />
    </div>
  )
}
