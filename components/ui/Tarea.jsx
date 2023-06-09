import { View, StyleSheet, Alert } from 'react-native'
import { Text, useToast, Icon, CheckCircleIcon, Pressable } from 'native-base'
import { gql, useMutation } from '@apollo/client'


const ACTUALIZAR_TAREA = gql`
    mutation actualizarTarea($id: ID!, $input: TareaInput, $estado: Boolean) {
        actualizarTarea(id: $id, input: $input, estado: $estado) {
            nombre
            id
            proyecto
            estado
        }
    }
`
const ELIMINAR_TAREA = gql`
    mutation eliminarTarea($id: ID!){
        eliminarTarea(id: $id)
    }
`

//Consulta las tareas del proyecto
const OBTENER_TAREAS = gql`
    query obtenerTareas($input: ProyectoIDInput) {
        obtenerTareas(input: $input) {
            id
            nombre
            estado
        }
    }
`

const Tarea = ({ tarea }) => {

    //Apollo
    const [actualizarTarea, { data, loading, error }] = useMutation(ACTUALIZAR_TAREA)
    const [eliminarTarea] = useMutation(ELIMINAR_TAREA, {
        refetchQueries: [
            OBTENER_TAREAS, // DocumentNode object parsed with gql
            'obtenerTareas' // Query name
          ],
    })

    //Cambia de completo a incompleto el estado de la tarea
    const cambiarEstado = async () => {

        //Obtener id de la tarea
        const { id } = tarea

        try {
            await actualizarTarea({
                variables: {
                    id: id,
                    input: {
                        nombre: tarea.nombre
                    },
                    estado: !tarea.estado
                }
            })
            console.log(loading, data)
        } catch (error) {
            console.log(error)
        }
    }

    //Dialogo para eliminar o no una tarea
    const mostrarEliminar = () => {
        Alert.alert('Eliminar Tarea', '¿Deseas eliminar esta tarea?', [
            {
                text: 'Cancelar',
                style: 'cancel'
            },
            {
                text: 'Ok',
                onPress: () => eliminarTareaDB()
            }
        ])
    }

    //Eliminar tarea de la base de datos

    const eliminarTareaDB = async () => {
        const { id } = tarea


        try {
            const { data } = await eliminarTarea({
                variables: {
                    id
                }
            })
            console.log(data)

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Pressable
                onPress={() => cambiarEstado()}
                onLongPress={() => mostrarEliminar()}
                style={styles.listItem}
            >
                <Text color='#000' fontSize='15' width='90%'>{tarea.nombre}</Text>
                <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>

                    {tarea.estado ? (
                        <CheckCircleIcon size='xl' style={styles.completo} />
                    ) : (
                        <CheckCircleIcon size='xl' style={styles.incompleto} />
                    )}
                </View>
            </Pressable>
        </>
    );
}

const styles = StyleSheet.create({
    listItem: {
        backgroundColor: '#FFF',
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginBottom: 3,
        flexDirection: 'row',
        alignItems: 'center'
    },
    completo: {
        color: 'green'
    },
    incompleto: {
        color: '#E1E1E1'
    }
})

export default Tarea;

