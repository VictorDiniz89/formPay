import React from "react";

import Formulario from "./form";


 

function Home(){
  return (
    
    <div className="app">
        <div className="image-container">
            <img src={`${process.env.PUBLIC_URL}/config.jpg`} alt="Mulher Orando" className="praying-image" />
        </div>
        <h1>Conferência de Mulheres 2024</h1>
        <header className="form-container">   
         <Formulario/>
        </header>
    </div>    
    
  )
}

export default Home;