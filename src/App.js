import { Route, Routes } from "react-router-dom";
import Home from "./PAGES/HOME/Home";
import Navbar from "./PAGES/SHARED/Navbar";
import About from "./PAGES/About";
import Login from "./PAGES/Login";
import Appointment from "./PAGES/APPOINTMENT/Appointment";

function App() {
  return (
    <div className='max-w-7xl mx-auto px-10'>
     <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/appointment" element={<Appointment/>}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
