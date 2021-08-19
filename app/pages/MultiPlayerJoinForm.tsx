import { MultiPlayerJoinFormRouteProp, MultiPlayerJoinFormNavigationProp } from "../RouteProps";
import React, { useState } from "react"
import { Text, Pressable, TextInput, View } from "react-native";
import { formStyles } from '../styles'

type Props = {
    route: MultiPlayerJoinFormRouteProp;
    navigation: MultiPlayerJoinFormNavigationProp;
};

export const MultiPlayerJoinFormPage = ( {route, navigation}: Props ) => {
    const [name, updateName] = useState('');
    const [roomCode, updateRoomCode] = useState('');

    const submit = () => {
        navigation.navigate("MultiPlayerWait", { owner: false, name, roomCode });
    };
  
    return (
        <View style={{width: '70%', margin: 'auto'}}>
            <Text style={{marginLeft: 12}}>Your name?</Text>
            <TextInput style={formStyles.input} value={name} onChangeText={updateName} />
   
            <Text style={{marginLeft: 12, marginTop: 20}}>Room code?</Text>
            <TextInput style={formStyles.input} value={roomCode} onChangeText={updateRoomCode} />
   
            <View style={{width: '80%', margin: 'auto'}}>
            <Pressable disabled={name.length === 0 || roomCode.length === 0} style={formStyles.button} onPress={submit}>
              <Text style={formStyles.buttonText}>Confirm</Text>
            </Pressable>
            <Pressable style={formStyles.button} onPress={() => navigation.goBack()}>
                <Text style={formStyles.buttonText}>Back</Text>
            </Pressable>
          </View>
        </View>
    )
}