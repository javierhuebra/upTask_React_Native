import { View, StyleSheet } from 'react-native'
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


const Tarea = ({ tarea }) => {

    //Apollo
    const [ actualizarTarea, {data, loading, error} ] = useMutation(ACTUALIZAR_TAREA)

    //Cambia de completo a incompleto el estado de la tarea
    const cambiarEstado = async () => {

        //Obtener id de la tarea
        const { id } = tarea

        try{
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
        }catch(error){
            console.log(error)
        }
    }

    return (
        <>
            <Pressable
                onPress={ ()=> cambiarEstado()}
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

