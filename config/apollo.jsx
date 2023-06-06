import {useEffect} from 'react'
import { ApolloClient, InMemoryCache } from '@apollo/client';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'



//Para conectar con el usuario creo algunos links de direcciones
const httpLink = createHttpLink({
  uri: 'http://192.168.0.109:4000'
})

//Creo un context con el token 
const authLink = setContext(async (_, { headers }) => {
  
  //Leer el token aca como use useEffect en el login para guardar el token, aparecen dos tokens distintos, se puede arreglar pero esta raro y no se como ahora.
  const token = await AsyncStorage.getItem('token')

  return{
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }

})

const link = authLink.concat(httpLink)

console.log(authLink)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default client