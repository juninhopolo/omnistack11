import React, {useEffect, useState} from 'react';
import logoImg from '../../assets/logo.svg'

import {FiPower} from 'react-icons/fi';
import {FiTrash2} from 'react-icons/fi';

import {Link, useHistory} from 'react-router-dom';
import './styles.css';

import '../../services/api';
import api from '../../services/api';

function Profile(){
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const [incidents, setIncidents] = useState([]);

    const history = useHistory();

    //Recarrega os casos toda vez que o ongId é altera. Nessa caso recarrega os casos quando o usuário entra na página.
    //Essa função serve para disparar uma função quando determinado componente React sofre alterações.
    useEffect(() => {
        api.get('profile', {headers: {Authorization: ongId}})
        .then(response => {
            setIncidents(response.data);
        });
    }, [ongId]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {Authorization:ongId}
            });
            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch(err){
            alert('Erro ao deletar caso, tente novamente');
        }
    }

    async function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profilecontainer">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="/incidents/new">
                    Cadastrar novo caso
                </Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={16} color="#e02041"/>
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => {
                    return (
                        <li key={incident.id}>
                            <strong>Caso:</strong>
                            <p>{incident.title}</p>

                            <strong>Descrição</strong>
                            <p>{incident.description}</p>

                            <strong>Valor</strong>
                            <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                            
                            {/* Similar ao lambda do python para que a função não seja executada no momento em que o objeto é renderizado */}
                            <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                                <FiTrash2 size={20} color="#a8a8b3"/>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Profile;