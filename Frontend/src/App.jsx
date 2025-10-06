
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Worker from './components/Worker'
// import WorkerServices from './components/WorkerServices'
// import Navbar from './components/Navbar'
import SignUp from './components/SingUp'
import Home from './pages/home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import Booking from './components/Booking'

const App = () => {
  return (
   <>
    <BrowserRouter>
      <Navbar/> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book/:id" element={<Booking />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App