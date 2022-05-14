import { Route, Routes } from "react-router-dom";
import Home from "./PAGES/HOME/Home";
import Navbar from "./PAGES/SHARED/Navbar";

function App() {
  return (
    <div className='max-w-7xl mx-auto px-10'>
     <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
