import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

const client = JSON.parse(localStorage.getItem('client'))

function SucessoPage() {
  return (
    <div className="app">
      <div className="image-container">
        <img src={`${process.env.PUBLIC_URL}/config.jpg`} alt="Mulher Orando" className="praying-image" />
      </div>
      <h1>Conferência de Mulheres 2024</h1>

      <header className="form-dados">
        <h2> {client.nome}</h2>
        <h2> {client.cidade}</h2>
        <h2> {client.igreja}</h2>
      </header>

      <header className="form-concluido">
      <i className="fas fa-check-circle" style={{ color: 'green', fontSize: '34px' }}></i>
        <h7>Pagamento Concluído</h7>
        <p>Obrigado por sua inscrição! Estamos ansiosos para te ver em nossa conferência.</p>
      </header>
    </div>
  );
}

export default SucessoPage;
