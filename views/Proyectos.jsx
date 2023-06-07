import { Button, Text, Heading, Pressable } from 'native-base'
import { StyleSheet, View, FlatList } from 'react-native'
import globalStyles from "../styles/global";

import { useNavigation } from "@react-navigation/native";

import { gql, useQuery } from '@apollo/client'

const OBTENER_PROYECTOS = gql`
    query obtenerProyectos {
        obtenerProyectos {
            id
            nombre
        }
    }
`


const Proyectos = () => {

    const navigation = useNavigation()

    

    //Apollo //para no usar useEffect hay que jugar con el loading, cuando loading es false la respuesta ya esta
    const { loading, error, data } = useQuery(OBTENER_PROYECTOS);

    console.log(loading)
    console.log(error)
    console.log(data)


    return (
        <View style={[globalStyles.contenedor, { backgroundColor: '#E84347' }]}>
            <View style={[globalStyles.contenido, { justifyContent: 'flex-start' }]}>
                <Button
                    backgroundColor='#28303B'
                    mt='5'
                    onPress={() => navigation.navigate('NuevoProyecto')}
                >
                    <Text
                        textTransform='uppercase'
                        fontWeight='bold'
                        color='#FFF'

                    >
                        Nuevo Proyecto</Text>
                </Button>

                <Heading
                    fontSize='26'
                    textAlign='center'
                    mb='10'
                    color='#FFF'
                    mt='5'
                >
                    Selecciona un proyecto
                </Heading>

                <View style={styles.contenido}>
                    {data?.obtenerProyectos.map(proyecto => (
                        <Pressable
                            style={styles.item} key={proyecto.id}
                            onPress={() => navigation.navigate('Proyecto', proyecto)}
                        >
                            <Text fontSize='18'>{proyecto.nombre}</Text>
                        </Pressable>
                    ))}
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contenido: {
        backgroundColor: '#FFF',
        marginHorizontal: '2.5%',
        paddingHorizontal: 5
    },
    item: {
        borderColor: '#999',
        borderBottomWidth: 2,
        paddingVertical: 10,
        paddingLeft: 5
    }
})

export default Proyectos;