import { Text, Button, useToast, Input, Heading } from 'native-base'
import { View, StyleSheet } from 'react-native'
import globalStyles from '../styles/global';

import { AlertaContext } from "../App";
import { useState } from 'react'

import { useNavigation } from '@react-navigation/native';

//Apollo
import { gql, useMutation } from '@apollo/client'

const NUEVO_PROYECTO = gql`
mutation nuevoProyecto($input: ProyectoInput ) {
    nuevoProyecto(input : $input){
        nombre
        id
    }
}
`

//Actualizar el cache
const OBTENER_PROYECTOS = gql`
    query obtenerProyectos {
        obtenerProyectos {
            id
            nombre
        }
    }
`



const NuevoProyecto = () => {

    //Navegacion
    const navigation= useNavigation()

    const toast = useToast()
    //State del nombre del proyecto
    const [nombreProyecto, setNombreProyecto] = useState('')


    //Apollo

     //Mutation de apollo //Esto para refrescar el cache cuando se agrega un nuevo proyecto, esta en la docu
     const [nuevoProyecto, { data, loading, error }] = useMutation(NUEVO_PROYECTO, {
        refetchQueries: [
            OBTENER_PROYECTOS, // DocumentNode object parsed with gql
            'obtenerProyectos' // Query name
          ],
     });





    //Validar crear proyecto
    const handleSubmit = async () => {
        if (nombreProyecto === '') {
            toast.show({
                description: 'El nombre del proyecto es obligatorio'
            })
            return
        }
        

        try{
            await nuevoProyecto({
                variables: {
                    input: {
                        nombre: nombreProyecto
                    }
                }
            })
            toast.show({
                description: ` El proyecto ${nombreProyecto} fue creado`
            })
            navigation.navigate('Proyectos')
        }catch(error){
            console.log(error)
            toast.show({
                description: `${error.message}`
            })
        }
    }

    return (
        <View style={[globalStyles.contenedor, { backgroundColor: '#E84347' }]}>
            <View style={globalStyles.contenido}>
                <Heading
                    fontSize='26'
                    textAlign='center'
                    mb='5'
                    color='#FFF'

                >
                    Nuevo Proyecto
                </Heading>

                <Input
                    backgroundColor='#FFF'
                    pl='2'
                    variant="outline"
                    placeholder="Nombre del Proyecto"
                    onChangeText={texto => setNombreProyecto(texto)}
                />


                <Button
                    backgroundColor='#28303B'
                    mt='5'
                    onPress={() => handleSubmit()}
                >
                    <Text
                        textTransform='uppercase'
                        fontWeight='bold'
                        color='#FFF'

                    >
                        crear proyecto</Text>
                </Button>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({

})

export default NuevoProyecto;