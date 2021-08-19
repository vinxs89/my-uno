import React from "react"
import { Button } from "react-native"
import { CardUtils } from "../game/CardUtils";
import { HomeRouteProp, HomeNavigationProp } from "../RouteProps";

type Props = {
  route: HomeRouteProp;
  navigation: HomeNavigationProp;
};

export const HomePage = ( { route, navigation }: Props) => {
    const cards = CardUtils.createDeck()
    console.log(cards.map(c => c.id).toString());
    return (
        <div>
            <Button
                onPress={() => navigation.navigate("SinglePlayerForm")}
                title="Single Player"
                color="#841584"
                accessibilityLabel="Partita Singola"
                />
            <Button
                onPress={() => navigation.navigate("MultiPlayerSelect")}
                title="Multiplayer"
                color="#841584"
                accessibilityLabel="Partita Multiplayer"
                />
            <Button
                onPress={() => navigation.navigate("Settings")}
                title="Settings"
                color="#841584"
                accessibilityLabel="Impostazioni"
                />
        </div>
    )
}