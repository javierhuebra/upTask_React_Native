
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

//Apollo
import client from './config/apollo';
import { ApolloProvider } from '@apollo/client';

//Importante envolver esta funcion en parentesis no en llaves, sino no anda el context
const upTaskApp = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)

AppRegistry.registerComponent(appName, () => upTaskApp);
