import React from "react";
import './App.css'

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from "./pages/home";
import StatusPage from "./pages/status";
import SucessoPage from "./pages/sucesso/status";
 
function App(){
  return (
    <Router>
      
        <Routes>
          <Route path="/" element={<Navigate to="/inscricao" />}/>
          <Route path="/inscricao" element={<Home/>}/>
          <Route path="/inscricao/status" element={<StatusPage/>}/>
          <Route path="/inscricao/sucesso" element={<SucessoPage/>}/>
        </Routes>
        
      </Router>
    
  )
}

export default App;