DEPENDENCIAS USADAS PARA REACT NAVIGATION + IMPORTS (Atencion el return del app debe estar contenido en <></> sino no anda)

- npm install @react-navigation/native

- npm install react-native-screens

- npm install react-native-safe-area-context

- npm install @react-navigation/native-stack

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

PARA PODER ACCEDER A LOS DATOS QUE ESTAN EN EL BACKEND VAMOS A USAR APOLLO CLIENTE, EN EL BACK USAMOS APOLLO SERVER Y GRAPHQL.

- npm install @apollo/client
- npm install graphql


PARA GUARDAR EL TOKEN SE UTILIZAR ASYNC STORAGE

- npm i @react-native-async-storage/async-storage