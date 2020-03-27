import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

function Routes(){
    return (
        <BrowserRouter>
            {/* Garante que apenas uma rota seja chamada, mesma quando existe rotas com nomes iguais */}
            <Switch>
                {/* exact faz com que a rota digitada no navegador seja exatamente igual
                    pois o switch tem seu funcinamento igual as regras de um firewall;
                */}
                <Route path="/" exact component={Logon}></Route>    

                <Route path="/register" component={Register}></Route>
                
                <Route path="/profile" component={Profile}></Route>

                <Route path="/incidents/new" component={NewIncident}></Route>
            </Switch>
        </BrowserRouter>
    );

}

export default Routes;