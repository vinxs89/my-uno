import { MultiPlayerWaitRouteProp, MultiPlayerWaitNavigationProp } from "../RouteProps";
import React from "react"

type Props = {
    route: MultiPlayerWaitRouteProp;
    navigation: MultiPlayerWaitNavigationProp;
};

export const MultiPlayerWaitPage = ( {route, navigation}: Props ) => {
    return (
        <div>MultiPlayer Wait</div>
    )
}