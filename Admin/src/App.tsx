import './App.css'
import { Route,Routes } from 'react-router-dom'
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import NewUser from './Components/NewUser';
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="about" element={ <About/> } />
        <Route path="contact" element={ <Contact/> } />
        <Route path="register" element={ <NewUser/> } />
        <Route path="*" element={ <div>404 Page Not Found</div> } />
      </Routes>
    </>
  )
}

export default App
