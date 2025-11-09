import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import { BackendProvider } from "./BackendContext";
import Navbar from "./Components/navbar"
import Signup from "./Screens/Signup"
import Login from "./Screens/Login"

const App = () => {
  return (
    <BackendProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={2500} />
    </BackendProvider>
  )
}

export default App