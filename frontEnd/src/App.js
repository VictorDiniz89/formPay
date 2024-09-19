import React from "react";
import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from "./pages/home";
import StatusPage from "./pages/status";
import SucessoPage from "./pages/sucesso/status";
 
function App(){
  return (
    <Router>
      
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/status" element={<StatusPage/>}/>
          <Route path="/sucesso" element={<SucessoPage/>}/>
        </Routes>
        
      </Router>
    
  )
}

export default App;