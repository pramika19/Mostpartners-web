import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import Ambient from './components/layout/Ambient.jsx'
import ScrollManager from './components/layout/ScrollManager.jsx'
import ScrollRail from './components/layout/ScrollRail.jsx'
import useReveal from './hooks/useReveal.js'
import Home from './pages/home/Home.jsx'
import RoutePage from './pages/explore/RoutePage.jsx'

export default function App() {
  useReveal()

  return (
    <>
      <ScrollManager />
      <Ambient />
      <ScrollRail />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* the About page was taken off the site on 2026-11-03; old links land on the home page */}
        <Route path="/about" element={<Navigate to="/" replace />} />
        <Route path="/founders" element={<RoutePage route="founders" />} />
        <Route path="/companies" element={<RoutePage route="companies" />} />
        <Route path="/investors" element={<RoutePage route="investors" />} />
      </Routes>
      <Footer />
    </>
  )
}
