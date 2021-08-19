import { SinglePlayerFormRouteProp, SinglePlayerFormNavigationProp } from "../RouteProps";
import React, { useState } from "react"
import { Text, Pressable, View } from "react-native";
import { Picker } from "@react-native-community/picker";
import { formStyles } from "../styles";

type Props = {
    route: SinglePlayerFormRouteProp;
    navigation: SinglePlayerFormNavigationProp;
};

export const SinglePlayerFormPage = ( {route, navigation}: Props ) => {
    const [playersCount, updatePlayersCount] = useState(2);

    const submit = () => {
        navigation.navigate("MultiPlayerWait", { owner: true, name, playersCount });
    };

    return (
        <View style={{width: '70%', margin: 'auto'}}>
            <Text style={{marginLeft: 12, marginTop: 20}}>How many players?</Text>
                <Picker style={formStyles.select} selectedValue={playersCount} onValueChange={(iv) => updatePlayersCount(parseInt(iv.toString()))}>
                <Picker.Item label="1" value={1}></Picker.Item>
                <Picker.Item label="2" value={2}></Picker.Item>
                <Picker.Item label="3" value={3}></Picker.Item>
                <Picker.Item label="4" value={4}></Picker.Item>
                <Picker.Item label="5" value={5}></Picker.Item>
                <Picker.Item label="6" value={6}></Picker.Item>
            </Picker>
            
            <View style={{width: '80%', margin: 'auto'}}>
                <Pressable style={formStyles.button} onPress={submit}>
                    <Text style={formStyles.buttonText}>Confirm</Text>
                </Pressable>    
                <Pressable style={formStyles.button} onPress={() => navigation.goBack()}>
                    <Text style={formStyles.buttonText}>Back</Text>
                </Pressable>
            </View>
        </View>    
    )
}