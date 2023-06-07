//Traigo el context para la alerta
import { AlertaContext } from "../App";

import { useContext, useState, useEffect } from 'react'

import { Text, Button, Heading, Input, Spinner } from "native-base";
import { View } from 'react-native'

import { useNavigation } from "@react-navigation/native";

import AlertaNatBase from "../components/ui/AlertaNatBase";
import globalStyles from "../styles/global";

//Apollo
import { gql, useMutation } from '@apollo/client'

//Async-storage
import AsyncStorage from "@react-native-async-storage/async-storage";


const AUTENTICAR_USUARIO = gql`
mutation autenticarUsuario($input: AutenticarInput){
    autenticarUsuario(input: $input){
      token
    }
  }
`

const Login = () => {

    //State para login
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // React navigation
    const navigation = useNavigation()

    //Destructuro del context
    const { mensaje, setMensaje } = useContext(AlertaContext)


    //Mutation de apollo
    const [autenticarUsuario, { data, loading, error }] = useMutation(AUTENTICAR_USUARIO);

    //Cuando se presiona iniciar sesión
    const handleSubmit = async () => {

        //Validar
        if (email === '' || password === '') {
            // Mostrar un error
            setMensaje('Todos los campos son obligatorios')

            //Este pequeño return hace que salga de la funcion cuando algun campo este vacio, sino se complica con la de abajo
            return

        }

        try {

            await autenticarUsuario({
                variables: {
                    input: {
                        email: email,
                        password: password
                    }
                }
            })

            //Otra forma de hacer esto sin useEffect (no probado aun pero estoy seguro(? )
            /* if (loading !== true) {
                const { token } = data.autenticarUsuario

                //Colocar el token en storage
                await AsyncStorage.setItem('token', token)

                //Redireccionar a Proyectos
                navigation.navigate('Proyectos')
            } */





        } catch (error) {
            console.log(error)
        }
    }

    //Cuando hay algun error en el servidor, la variable data cambia a undefined, no se llega a detectar el cambio si no uso un useEffect con el arreglo de dependencias    
    useEffect(() => {
        if (data) {

            //Creao una funcion async para poder cargar el token en asyncstorage
            const obtenerToken = async () => {
                const { token } = data.autenticarUsuario

                //Colocar el token en storage
                await AsyncStorage.setItem('token', token)

                console.log("el token cargado en async es: ", token)
            }
            obtenerToken()


            //Redireccionar a Proyectos
            navigation.navigate('Proyectos')

        }

        if (error) {
            setMensaje(error.message)
        }
    }, [data, error])

    return (
        <View style={[{ backgroundColor: '#E84347' }, globalStyles.contenedor]}>
            <View style={globalStyles.contenido}>

                <Heading
                    fontSize='36'
                    textAlign='center'
                    mb='10'
                    color='#FFF'
                >
                    UpTask
                </Heading>

                <Input
                    variant="rounded"
                    placeholder="Email"
                    backgroundColor='#FFF'
                    mb='5'
                    onChangeText={texto => setEmail(texto)}
                    value={email}
                />

                <Input
                    variant="rounded"
                    type="password"
                    placeholder="Password"
                    backgroundColor='#FFF'
                    mb='5'
                    onChangeText={texto => setPassword(texto)}
                />
                {loading && <Spinner color="black" size='lg' mb='3' />}
                {mensaje && <AlertaNatBase mensaje={mensaje} setMensaje={setMensaje} />}
                <Button
                    mb='5'
                    backgroundColor='#28303B'
                    onPress={() => handleSubmit()}
                >
                    <Text color='#FFF' fontWeight='bold'>INICIAR SESIÓN</Text>
                </Button>

                <Text onPress={() => navigation.navigate('CrearCuenta')} color='#FFF' textAlign='center' fontSize='xl'>¿No tienes cuenta? <Text fontWeight='bold'>¡Regístrate!</Text></Text>
            </View>
        </View>
    );
}

export default Login;