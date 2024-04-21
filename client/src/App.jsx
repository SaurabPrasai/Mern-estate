import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import { useSelector } from "react-redux";

export default function App() {
  const {currentUser}=useSelector(state=>state.user);
  return <BrowserRouter>
  <Header/>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/sign-in" element={<Signin/>} />
    <Route path="/sign-up" element={<SignUp/>} />
    <Route path="/about" element={<About/>} />
    <Route path="/profile" element={currentUser?<Profile/>:<Signin/>} />
  </Routes>

  </BrowserRouter>;
}

