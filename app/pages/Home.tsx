import React from "react"
import { View, Pressable, Text, BackHandler } from "react-native"
import { HomeRouteProp, HomeNavigationProp } from "../RouteProps";
import { formStyles } from '../styles'

type Props = {
  route: HomeRouteProp;
  navigation: HomeNavigationProp;
};

export const HomePage = ( { navigation }: Props) => {
    return (
        <View style={{width: '70%', margin: 'auto'}}>
            <Pressable style={formStyles.button} onPress={() => navigation.navigate("SinglePlayerForm")}>
                <Text style={formStyles.buttonText}>Single Player</Text>
            </Pressable>
            <Pressable style={formStyles.button} onPress={() => navigation.navigate("MultiPlayerSelect")}>
                <Text style={formStyles.buttonText}>Multi Player</Text>
            </Pressable>
            <Pressable style={formStyles.button} onPress={() => navigation.navigate("Settings")}>
                <Text style={formStyles.buttonText}>Settings</Text>
            </Pressable>
            <Pressable style={formStyles.button} onPress={() => BackHandler.exitApp()}>
                <Text style={formStyles.buttonText}>Exit</Text>
            </Pressable>
        </View>
    )
}
