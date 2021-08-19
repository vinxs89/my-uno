import { MultiPlayerCreateFormRouteProp, MultiPlayerCreateFormNavigationProp } from "../RouteProps";
import React from "react"
import { Button, TextInput, View } from "react-native";
import { Picker } from "@react-native-community/picker";
import { useState } from "react";

type Props = {
  route: MultiPlayerCreateFormRouteProp;
  navigation: MultiPlayerCreateFormNavigationProp;
};

export const MultiPlayerCreateFormPage = ( {route, navigation}: Props ) => {
    const [name, updateName] = useState('');
    const [playersCount, updatePlayersCount] = useState(2);

    const submit = () => {
      navigation.navigate("MultiPlayerWait", { owner: true, name, playersCount });
    };

    return (
        <View>
          <TextInput placeholder="Name" value={name} onChangeText={updateName} />
          <Picker selectedValue={playersCount} onValueChange={(itemValue) => updatePlayersCount(itemValue as number)}>
            <Picker.Item label="1" value={1}></Picker.Item>
            <Picker.Item label="2" value={2}></Picker.Item>
            <Picker.Item label="3" value={3}></Picker.Item>
            <Picker.Item label="4" value={4}></Picker.Item>
          </Picker>
          <Button onPress={submit} title="Conferma" />
        </View>
    )
}