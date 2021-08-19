import React from "react"
import { MultiPlayerSelectRouteProp, MultiPlayerSelectNavigationProp } from "../RouteProps";
import { View, Pressable, Text } from "react-native"
import { formStyles } from '../styles'

type Props = {
    route: MultiPlayerSelectRouteProp;
    navigation: MultiPlayerSelectNavigationProp;
};

export const MultiPlayerSelectPage = ( {navigation}: Props ) => {
    return (
        <View style={{width: '70%', margin: 'auto'}}>
            <Pressable style={formStyles.button} onPress={() => navigation.navigate("MultiPlayerCreateForm")}>
                <Text style={formStyles.buttonText}>Create new game</Text>
            </Pressable>
            <Pressable style={formStyles.button} onPress={() => navigation.navigate("MultiPlayerJoinForm")}>
                <Text style={formStyles.buttonText}>Join a match</Text>
            </Pressable>
            <Pressable style={formStyles.button} onPress={() => navigation.goBack()}>
                <Text style={formStyles.buttonText}>Back</Text>
            </Pressable>
        </View>  
    )
}
