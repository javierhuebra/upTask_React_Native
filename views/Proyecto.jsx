import { useState, useContext } from 'react'

import { View } from 'react-native'
import { Button, Text, Heading, Input, useToast, ScrollView } from 'native-base'

import globalStyles from '../styles/global'

import { AlertaContext } from '../App'
import AlertaNatBase from '../components/ui/AlertaNatBase'
import Tarea from '../components/ui/Tarea'

import { gql, useMutation, useQuery } from '@apollo/client'

//Crea nuevas tareas
const NUEVA_TAREA = gql`
    mutation nuevaTarea($input: TareaInput) {
        nuevaTarea(input: $input) {
            nombre
            id
            proyecto
            estado
        }
    }
`

//Consulta las tareas del proyecto (aca solo no me traigo el proyecto porque cuando haga la consulta ya estoy en el proyecto ese)
const OBTENER_TAREAS = gql`
    query obtenerTareas($input: ProyectoIDInput) {
        obtenerTareas(input: $input) {
            id
            nombre
            estado
        }
    }
`

const Proyecto = ({ route }) => {
    /* console.log(route.params) */

    //obtiene el id del proyecto
    const { id } = route.params

    //State del componente
    const [nombre, setNombre] = useState('')

    //Destructuro del context
    const { mensaje, setMensaje } = useContext(AlertaContext)

    const toast = useToast()


    //Apollo obtener tareas, destructure data loading y error aca, porque en la mutation no los estaba usando
    const { data, loading, error } = useQuery(OBTENER_TAREAS, {
        variables: {
            input: {
                proyecto: id
            }
        }
    });
    console.log(loading)
    console.log(error)
    console.log(data)

    //Apollo crear tarea
    const [nuevaTarea] = useMutation(NUEVA_TAREA)

    //Validar y crear tareas
    const handleSubmit = async () => {
        if (nombre === '') {
            setMensaje('Ingrese una tarea')
            return
        }

        //Almacenarla en la base de datos
        try {
            await nuevaTarea({
                variables: {
                    input: {
                        nombre: nombre,
                        proyecto: route.params.id
                    }
                }
            })
            setNombre('')
            mostrarAlerta()
        } catch (error) {

        }

    }

    const mostrarAlerta = () => {
        toast.show({
            description: `Tarea creada satisfactoriamente`,
            placement: 'top'
        })
    }

    //Si apollo esta consultando
    if (loading) return <Text>Cargando...</Text>

    return (
        <View style={[globalStyles.contenedor, { backgroundColor: '#E84347' }]}>
            <View style={[globalStyles.contenido, { justifyContent: 'flex-start' }]}>
                <Input
                    backgroundColor='#FFF'
                    pl='2'
                    variant="outline"
                    placeholder="Escribir una tarea"
                    mt='5'
                    value={nombre}
                    onChangeText={texto => setNombre(texto)}

                />
                {mensaje && <AlertaNatBase mensaje={mensaje} setMensaje={setMensaje} />}
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
                        Crear tarea</Text>
                </Button>
                <Heading color='#FFF' textAlign='center' marginY='5'>
                    Tareas: {route.params.nombre}
                </Heading>

                <View style={{ height: '70%'}}>
                    <ScrollView >
                        {data.obtenerTareas.map(tarea => (
                            <Tarea key={tarea.id} tarea={tarea} />
                        ))}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}

export default Proyecto;