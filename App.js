
import 'react-native-gesture-handler';
import React from 'react';
import {Root} from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

import Login from './views/login'
import CrearCuenta from './views/crearCuenta'
import Proyectos from './views/proyectos'
import NuevoProyecto from './views/nuevoProyecto'
import Proyecto from './views/proyecto'

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const App = () => {
  return (
    <Root>
 <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Login"
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Inicio de sesión',
          headerShown:false
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={CrearCuenta}
        options={{
          title: 'Crear cuenta',
          headerShown:true,
          headerStyle:{
            backgroundColor:'#28303B'
          },
          headerTintColor:'#fff',
          headerTitleStyle:{
            fontWeight:'bold'
          }
        }}
      />
      <Stack.Screen
        name="Proyectos"
        component={Proyectos}
        options={{
          title: 'Proyectos',
          headerShown:true,
          headerStyle:{
            backgroundColor:'#28303B'
          },
          headerTintColor:'#fff',
          headerTitleStyle:{
            fontWeight:'bold'
          }
        }}
      />
    <Stack.Screen
        name="NuevoProyecto"
        component={NuevoProyecto}
        options={{
          title: 'Nuevo Proyecto',
          headerShown:true,
          headerStyle:{
            backgroundColor:'#28303B'
          },
          headerTintColor:'#fff',
          headerTitleStyle:{
            fontWeight:'bold'
          }
        }}
      />
      <Stack.Screen
        name="Proyecto"
        component={Proyecto}
        options={({route})=>({
          title: route.params.nombre,
          headerShown:true,
          headerStyle:{
            backgroundColor:'#28303B'
          },
          headerTintColor:'#fff',
          headerTitleStyle:{
            fontWeight:'bold'
          }
        })}
      />
     
     
    </Stack.Navigator>
  </NavigationContainer>
    </Root>
   
  );
};

const styles = StyleSheet.create({
  
});

export default App;
