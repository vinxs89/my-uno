import { SinglePlayerFormRouteProp, SinglePlayerFormNavigationProp } from "../RouteProps";
import React from "react"

type Props = {
    route: SinglePlayerFormRouteProp;
    navigation: SinglePlayerFormNavigationProp;
};

export const SinglePlayerFormPage = ( {route, navigation}: Props ) => {
    return (
        <div>SinglePlayer Form</div>
    )
}