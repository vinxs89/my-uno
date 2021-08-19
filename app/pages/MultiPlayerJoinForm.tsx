import { MultiPlayerJoinFormRouteProp, MultiPlayerJoinFormNavigationProp } from "../RouteProps";
import React, { useState } from "react"
import { Button, TextInput, View } from "react-native";

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
        <View>
          <TextInput placeholder="Name" value={name} onChangeText={updateName} />
          <TextInput placeholder="Room" value={roomCode} onChangeText={updateRoomCode} />
          <Button onPress={submit} title="Conferma" />
        </View>
    )
}