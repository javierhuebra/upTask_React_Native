
import React, { useState, createContext, useEffect } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Views
import Login from './views/Login';
import CrearCuenta from './views/CrearCuenta';
import Proyectos from './views/Proyectos';

//Imports provider para poder usar native base
import { NativeBaseProvider } from "native-base";
import NuevoProyecto from './views/NuevoProyecto';
import Proyecto from './views/Proyecto';

const Stack = createNativeStackNavigator();

//Creo y exporto un context chiquito para manejar la alerta y practicar
export const AlertaContext = createContext()

const App = () => {

  //State para la alerta
  const [mensaje, setMensaje] = useState(null)





  return (
    <>
      <StatusBar
        barStyle='dark-content'
        backgroundColor='#E84347'
      />
      <AlertaContext.Provider value={{ mensaje, setMensaje }}>
        <NativeBaseProvider>
          <NavigationContainer>
            <Stack.Navigator

              //aca centro todos los titulos de la barra superior
              screenOptions={{
                headerTitleAlign: 'center'
              }}

              //ruta en la que se inicia
              initialRouteName='Login'

            >
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  title: "Iniciar Sesión",

                  //mostrar la barra de navegacion
                  headerShown: false

                }}
              />

              <Stack.Screen
                name="CrearCuenta"
                component={CrearCuenta}
                options={{
                  title: "Crear Cuenta",
                  //Cambio el color de fondo solo de esta barra
                  headerStyle: {

                    backgroundColor: '#28303B'
                  },
                  headerTintColor: '#FFF',
                  headerTitleStyle: {
                    fontWeight: 'bold'
                  }
                }}

              />
              <Stack.Screen
                name="Proyectos"
                component={Proyectos}
                options={{
                  title: "Proyectos",
                  //Cambio el color de fondo solo de esta barra
                  headerStyle: {

                    backgroundColor: '#28303B'
                  },
                  headerTintColor: '#FFF',
                  headerTitleStyle: {
                    fontWeight: 'bold'
                  }
                }}
              />
               <Stack.Screen
                name="NuevoProyecto"
                component={NuevoProyecto}
                options={{
                  title: "Nuevo Proyecto",
                  //Cambio el color de fondo solo de esta barra
                  headerStyle: {

                    backgroundColor: '#28303B'
                  },
                  headerTintColor: '#FFF',
                  headerTitleStyle: {
                    fontWeight: 'bold'
                  }
                }}
              />
              <Stack.Screen
                name="Proyecto"
                component={Proyecto} 
                options={({route}) => ({ //Le paso route para poder cambiar el nombre del titulo de la view
                  title: route.params.nombre,
                  //Cambio el color de fondo solo de esta barra
                  headerStyle: {

                    backgroundColor: '#28303B'
                  },
                  headerTintColor: '#FFF',
                  headerTitleStyle: {
                    fontWeight: 'bold'
                  }
                })}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </AlertaContext.Provider>
    </>
  );
}

const styles = StyleSheet.create({

});

export default App;
