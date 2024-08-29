import React from "react";
import './App.css'
import Formulario from "./form";
import './payments/assets/style.css'
//import CardForm from "./payments/components/CardForm";
 

function App(){
  return (
    <div className="app">
      <div className="image-container">
      <img src={`${process.env.PUBLIC_URL}/woman.jpg`} alt="Mulher Orando" className="praying-image" />
    </div>
      <h1>Conferência de Mulheres 2024</h1>
      <header className="form-container">   
        <Formulario/>
        {/* <CardForm/> */}
      </header>
    </div>
  )
}

export default App;