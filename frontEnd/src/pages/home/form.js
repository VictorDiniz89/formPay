
import React, {useEffect, useState} from 'react'
import { json, useNavigate } from 'react-router-dom'
import axios from 'axios';


const createContact = async (formData) => {
    try {
        const server = 'https://oval-inquiry-411619.wl.r.appspot.com'
        const res = await axios.post(server + '/pessoa', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
        localStorage.setItem('client', JSON.stringify(res.data) )
    
    } catch (error) {
        console.error('Error:', error);
    }
};

const Formulario = () => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        cidade: '',
        igreja: ''
    })

const [isFormValid, setIsFormValid] = useState(false)    
const navigate = useNavigate()

const validForm = () => {
    const {nome, email, telefone, cidade, igreja} = formData;
    return nome && email && telefone && cidade && igreja 
}

useEffect(() =>{
    setIsFormValid(validForm())
}, [formData]);

const handeChange = (e) => {
    const {name, value} = e.target
    setFormData({
        ...formData,
        [name]: value
    })
}
const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    await createContact(formData);
    navigate('/inscricao/status')
};

return(
    <form onSubmit={handleSubmit}>
        <div>
            <label>Nome:</label>
            <input type="text" name="nome" value={formData.nome} onChange={handeChange}/>
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handeChange}/>
            </div>
            <div>
                <label>Telefone:</label>
                <input type="telefone" name="telefone" value={formData.telefone} onChange={handeChange}/>
            </div>
            <div>
                <label>Cidade:</label>
                <input type="cidade" name="cidade" value={formData.cidade} onChange={handeChange}/>
            </div>
            <div>
                <label>Igreja:</label>
                <input type="igreja" name="igreja" value={formData.igreja} onChange={handeChange}/>
            </div>
            <div className="button-container">
            <button type="submit" disabled={!isFormValid}>Inscrever-se</button>
            </div>
            </form>
)
}

export default Formulario