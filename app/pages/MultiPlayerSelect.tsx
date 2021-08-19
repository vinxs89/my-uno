import { MultiPlayerSelectRouteProp, MultiPlayerSelectNavigationProp } from "../RouteProps";
import React from "react"
import { Button } from "react-native";

type Props = {
    route: MultiPlayerSelectRouteProp;
    navigation: MultiPlayerSelectNavigationProp;
};

export const MultiPlayerSelectPage = ( {route, navigation}: Props ) => {
    return (
        <div>
            <Button
                onPress={() => navigation.navigate("MultiPlayerCreateForm")}
                title="MultiPlayer Create"
                color="#841584"
                accessibilityLabel="Crea"
                />
            <Button
                onPress={() => navigation.navigate("MultiPlayerJoinForm")}
                title="MultiPlayer Join"
                color="#841584"
                accessibilityLabel="Join"
                />
        </div>
    )
}