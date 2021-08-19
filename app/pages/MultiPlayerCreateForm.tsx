import { MultiPlayerCreateFormRouteProp, MultiPlayerCreateFormNavigationProp } from "../RouteProps";
import React from "react"

type Props = {
  route: MultiPlayerCreateFormRouteProp;
  navigation: MultiPlayerCreateFormNavigationProp;
};

export const MultiPlayerCreateFormPage = ( {route, navigation}: Props ) => {
    return (
        <div>MultiPlayer Create</div>
    )
}