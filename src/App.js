import { Route, Routes } from "react-router-dom";
import Home from "./PAGES/HOME/Home";
import Navbar from "./PAGES/SHARED/Navbar";
import About from "./PAGES/About";
import Login from "./PAGES/LOGIN/Login";
import Appointment from "./PAGES/APPOINTMENT/Appointment";
import SignUp from "./PAGES/LOGIN/SignUp";
import RequireAuth from "./PAGES/LOGIN/RequireAuth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className='max-w-7xl mx-auto px-10'>
     <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/appointment" element={<RequireAuth><Appointment/></RequireAuth>}>
        </Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
