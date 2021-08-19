import { MultiPlayerJoinFormRouteProp, MultiPlayerJoinFormNavigationProp } from "../RouteProps";
import React from "react"

type Props = {
    route: MultiPlayerJoinFormRouteProp;
    navigation: MultiPlayerJoinFormNavigationProp;
};

export const MultiPlayerJoinFormPage = ( {route, navigation}: Props ) => {
    return (
        <div>MultiPlayer Join</div>
    )
}