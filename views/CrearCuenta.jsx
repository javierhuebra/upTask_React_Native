import { useEffect, useState, useContext } from "react";

import { Text, Button, Heading, Input, Spinner } from "native-base";
import { View } from 'react-native'

import { useNavigation } from "@react-navigation/native";

import globalStyles from "../styles/global";
import AlertaNatBase from "../components/ui/AlertaNatBase";


//Apollo
import { gql, useMutation } from '@apollo/client'


//Context para la alerta
import { AlertaContext } from "../App";



const CrearCuenta = () => {

    //Se crea una mutation con lo que puse en el playground de apollo
    const NUEVA_CUENTA = gql`
        mutation crearUsuario($input: UsuarioInput){
        crearUsuario(input : $input)
        }
    `


    //Mutation de apollo
    const [crearUsuario, { data, loading, error }] = useMutation(NUEVA_CUENTA);


    //State del formulario
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //Destructuro del context
    const { mensaje, setMensaje } = useContext(AlertaContext)


    //React navigation
    const navigation = useNavigation()

    //Cuando el usuario presiona en el boton crear cuenta
    const handleSubmit = async () => {
        //Validar
        if (nombre === '' || email === '' || password === '') {
            // Mostrar un error
            setMensaje('Todos los campos son obligatorios')

            //Este pequeño return hace que salga de la funcion cuando algun campo este vacio, sino se complica con la de abajo
            return
        }

        //Password al menos 6 caracteres
        if (password.length < 6) {
            setMensaje('El password debe ser de al menos 6 caracteres')

            return
        }

        //Guardar el usuario (no lo escribi con ECMAS6 para verlo mejor aunque ya lo se je )
        try {
            await crearUsuario({
                variables: {
                    input: {
                        nombre: nombre,
                        email: email,
                        password: password
                    }
                }

            })

            navigation.navigate('Login')

        } catch (error) {
            console.log(error)
        }



    }

    useEffect(() => {
        if (data) {
            setMensaje(data.crearUsuario)
        }

        if (error) {
            setMensaje(error.message)
        }
    }, [data, error]);

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
                {loading ? <Spinner color="black" size='lg' mb='3'/> :

                    <>
                        <Input
                            placeholder="Nombre"
                            backgroundColor='#FFF'
                            mb='5'
                            onChangeText={texto => setNombre(texto)}
                        />

                        <Input
                            placeholder="Email"
                            backgroundColor='#FFF'
                            mb='5'
                            onChangeText={texto => setEmail(texto)}
                        />

                        <Input
                            type="password"
                            placeholder="Password"
                            backgroundColor='#FFF'
                            mb='5'
                            onChangeText={texto => setPassword(texto)}
                        />
                        {mensaje && <AlertaNatBase mensaje={mensaje} setMensaje={setMensaje} />}
                        <Button
                            mb='5'
                            backgroundColor='#28303B'
                            onPress={() => handleSubmit()}
                        >
                            <Text color='#FFF' fontWeight='bold'>CREAR CUENTA</Text>
                        </Button>
                    </>
                }




            </View>
        </View>
    );
}

export default CrearCuenta;