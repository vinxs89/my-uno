import { SettingsRouteProp, SettingsNavigationProp } from "../RouteProps";
import React from "react"

type Props = {
    route: SettingsRouteProp;
    navigation: SettingsNavigationProp;
};

export const SettingsPage = ( {route, navigation}: Props ) => {
    return (
        <div>Settings</div>
    )
}