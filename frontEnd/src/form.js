
import React, {useState} from 'react'
//import CardForm from './payments/components/CardForm'
import axios from 'axios';


const createContact = async (formData) => {
    try {
        const res = await axios.post('http://127.0.0.1:8000/api/contatos', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data);
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
    
    window.location.reload()
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
            <button type="submit">Inscrever-se</button>
            </div>
            {/* <CardForm/> */}
            {/* <button className="card-form__button">Enviar</button> */}
            </form>
)
}

export default Formulario