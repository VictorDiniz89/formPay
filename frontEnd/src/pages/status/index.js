import React, {useEffect, useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from 'axios'
import './status.css'


const getPaymentStatus = async (clientId) => {
    try {
      const server = 'https://oval-inquiry-411619.wl.r.appspot.com'  
      const res = await axios.get(`${server}/api/payment/status/${clientId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);

        return res.data
    } catch (error) {
        console.error('Error:', error);
        return null
    }
};

const resetPaymentStatus = async (clientId) => {
  try {
      const res = await axios.get(`http://www.iderptx.com.br/insc-api/api/payment/reset/${clientId}`, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      console.log(res.data);
      
      const client = JSON.parse(localStorage.getItem('client'));
      client.pid = res.data.pid;
      localStorage.setItem('client', JSON.stringify(client) )

      return res.data
  } catch (error) {
      console.error('Error:', error);
      return null
  }
};

function StatusPage(){
  
  const [paymentInfo, setPaymentInfo] = useState(null)
  const [copied, setCopied] = useState(false)
  const navigate = useNavigate();
  const client = JSON.parse(localStorage.getItem('client'))
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const clientId = JSON.parse(localStorage.getItem('client'))?.clientId
    if (clientId) {
      const intervalId = setInterval(() => {
        if (paymentInfo && paymentInfo.status !== 'pending') {
          clearInterval(intervalId)
          return
        }
        
        getPaymentStatus(clientId)
        .then(status => {
          setLoading(false)
          setPaymentInfo(status);
          if(status.status !== 'pending'){
            clearInterval(intervalId)
          }
        })
      }, 5000)

      return () => clearInterval(intervalId)
    }
  }, []);

  const  handleCopyPix = () =>{
    navigator.clipboard.writeText(paymentInfo?.pixCopiaCola)
    .then(() =>{
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
    .catch(error => console.log('Erro ao copiar:', error))
  }

  const StatusPending = () => {
    return (
      <div style={{marginTop: '40px'}}>
        <p>Pix copia e cola: {`${paymentInfo?.pixCopiaCola.substr(0, 40)}...`}</p>

        <button onClick={handleCopyPix}>Copiar Pix</button>
        {copied && <p style={{color: 'green'}}>Copiado!</p>}
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
          <div class="loader"></div>
          <p style={{textAlign: 'center'}}>Aguardando Pagamento...</p>

        </div>
      </div>
    )
  }

  const StatusApproved = () => {
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
          <i className="fas fa-check-circle" style={{ color: 'green', fontSize: '34px', margin: '20px 0 15px' }}></i>
          <h7 style={{color: 'green'}}><b>Pagamento Concluído</b></h7>
          <p>Obrigado por sua inscrição! Estamos ansiosos para te ver em nossa conferência.</p>
      </div>
    )
  }


  if (!client?.clientId) return <Navigate to='/' />

  return (
  <div className="app">
      <div className="image-container">
          <img src={`${process.env.PUBLIC_URL}/config.jpg`} alt="Mulher Orando" className="praying-image" />
      </div>
      <p className="title">Conferência de Mulheres 2024</p>
      <header className="form-dados" style={{padding: '10px 20px'}}>  
        <p> Nome: <b>{client.nome}</b></p>
        <p> Cidade: <b>{client.cidade}</b></p>
        <p> Igreja: <b>{client.igreja}</b></p>
        
        
        {loading && 
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
          <div class="loader"></div>
          <p style={{textAlign: 'center'}}>Verificando seu cadastro aguarde...</p>

      </div>
        }
        
        {!loading && paymentInfo &&
          <>
            {paymentInfo?.status === 'pending' && <StatusPending />}
            {paymentInfo?.status === 'approved' && <StatusApproved />}
          </>
        }
        
      </header>
  </div>    
    
  )
}

export default StatusPage;