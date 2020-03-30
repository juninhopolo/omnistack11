//Sempre ao usar sintaxe de TAG dentro de JS
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

//"Navegador" criado.
const AppStack = createStackNavigator();

//Meus components, Mains Activities, por assim dizer.
import Incidents from './pages/Incidents';
import Detail from './pages/Detail';

function Routes(){
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown:false}}>
                {/* Cada screen recebe uma page, ou seja, compornente react criado com Incidents e Detail */}
                <AppStack.Screen name='Incidents' component={Incidents}/>
                <AppStack.Screen name='Details' component={Detail}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;
