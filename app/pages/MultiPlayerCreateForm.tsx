import { MultiPlayerCreateFormRouteProp, MultiPlayerCreateFormNavigationProp } from "../RouteProps";
import React from "react"
import { Text, Pressable, TextInput, View } from "react-native";
import { Picker } from "@react-native-community/picker";
import { useState } from "react";
import { formStyles } from '../styles'

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
      <View style={{width: '70%', margin: 'auto'}}>
        <Text style={{marginLeft: 12, marginTop: 30}}>Your name?</Text>
        <TextInput style={formStyles.input} value={name} onChangeText={updateName} />
        
        <Text style={{marginLeft: 12, marginTop: 20}}>How many players?</Text>
        <Picker style={formStyles.select} selectedValue={playersCount} onValueChange={itemValue => updatePlayersCount(parseInt(itemValue.toString()))}>
          <Picker.Item label="1" value={1}></Picker.Item>
          <Picker.Item label="2" value={2}></Picker.Item>
          <Picker.Item label="3" value={3}></Picker.Item>
          <Picker.Item label="4" value={4}></Picker.Item>
          <Picker.Item label="5" value={5}></Picker.Item>
          <Picker.Item label="6" value={6}></Picker.Item>
        </Picker>
        <View style={{width: '80%', margin: 'auto'}}>
          <Pressable disabled={name.length === 0} style={formStyles.button} onPress={submit}>
            <Text style={formStyles.buttonText}>Confirm</Text>
          </Pressable>
          <Pressable style={formStyles.button} onPress={() => navigation.goBack()}>
            <Text style={formStyles.buttonText}>Back</Text>
          </Pressable>
        </View>
      </View>
    )
}
