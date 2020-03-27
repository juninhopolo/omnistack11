import React, {useState} from 'react';
import './styles.css';

import {Link, useHistory} from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi';

import '../../services/api';
import api from '../../services/api';

function Register(){
    //Cria um estado para cada uma das informações que precisaremos e que foram inputadas no form;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [whatsapp, SetWhatsapp] = useState("");
    const [city, setCity] = useState("");
    const [uf, setUf] = useState("");

    //Serve para enviar o usuário para uma rota quando não é possível pelo frontend.
    const history = useHistory();

    //Comunica-se com a api
    async function handleRegister(e){
        //Não deixa que o submit do form recarregue a página;
        e.preventDefault();

        const data = {
            name, 
            email, 
            whatsapp, 
            city, 
            uf
        };
        try{
            const response = await api.post('ongs', data);
            alert(`Seu ID de acesso: ${response.data.id}`);

            history.push('/');
        }catch(err){
            alert('Erro no cadastro, tente novamente');
        }
        
    }
    return (
        <div className="registercontainer">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero"/>

                    <h1>Cadastro</h1>

                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG</p>
                    <Link className="backlink" to="/">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Não tenho cadastro!
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        type="text" 
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => SetWhatsapp(e.target.value)}
                    />
                    <div className="inputgroup">
                        <input 
                            type="text" 
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        {/* Todo componente REACT possui a tag style que permite a inserção de propriedades CSS como objeto javascript */}
                        <input 
                            type="text"
                            placeholder="UF" 
                            style={{width: 80}}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>
                    <button type="submit"className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default Register;