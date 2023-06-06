import { View } from 'react-native'
import { Button, Text, Heading } from 'native-base'

const Proyecto = ({route}) => {
    console.log(route.params)
    return ( 
        <View>
            <Text>Proyecto</Text>
        </View>
     );
}
 
export default Proyecto;