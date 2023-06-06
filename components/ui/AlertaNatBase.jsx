import { Alert, VStack, HStack, Text, IconButton, CloseIcon, Pressable } from 'native-base'
import { useEffect, useState } from 'react';
const AlertaNatBase = ({ mensaje, setMensaje }) => {
    

    return (

        <Pressable onPress={() => setMensaje(null)}>
            <Alert mb='5' w="100%" status={mensaje === 'Usuario creado correctamente' ? 'success' : 'warning'}>
                <VStack space={2} flexShrink={1} w="100%">
                    <HStack flexShrink={1} space={2} justifyContent="space-between">
                        <HStack space={2} flexShrink={1}>
                            <Alert.Icon mt="1" />
                            <Text fontSize="md" color="coolGray.800">
                                {mensaje}
                            </Text>
                        </HStack>

                    </HStack>
                </VStack>
            </Alert>
        </Pressable>

    );
}

export default AlertaNatBase;