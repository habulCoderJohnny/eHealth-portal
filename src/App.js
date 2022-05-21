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
import Dashboard from "./PAGES/DASHBOARD/Dashboard";
import MyAppointments from "./PAGES/DASHBOARD/MyAppointments";
import MyReview from "./PAGES/DASHBOARD/MyReview";
import MyHistory from "./PAGES/DASHBOARD/MyHistory";
import USERS from "./PAGES/DASHBOARD/USERS";
import RequireAdmin from "./PAGES/LOGIN/RequireAdmin";
import AddDoctor from "./PAGES/DASHBOARD/AddDoctor";
import ManageDoctors from "./PAGES/DASHBOARD/ManageDoctors";
import Payment from "./PAGES/DASHBOARD/Payment/Payment";


function App() {
  return (
    <div className='max-w-7xl mx-auto px-10'>
     <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/appointment" element={<RequireAuth><Appointment/></RequireAuth>}>
        </Route>

        {/* Nested Route */}
        <Route path="dashboard" element={
          <RequireAuth><Dashboard/></RequireAuth>}>
          <Route index element={<MyAppointments/>}></Route>
          <Route path="review" element={<MyReview />}></Route>
          <Route path="history" element={<MyHistory />}></Route>
          <Route path="payment/:id" element={<Payment />}></Route>
          <Route path="users" element={<RequireAdmin><USERS /></RequireAdmin>}></Route>
          <Route path="add-doctor" element={<RequireAdmin><AddDoctor/></RequireAdmin>}></Route>
          <Route path="manage-doctor" element={<RequireAdmin><ManageDoctors/></RequireAdmin>}></Route>
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
