import { ActionCardType } from "./ActionCardType";
import { Color } from "./Color";

export class CardImageName {
    static getCardImageName = (value?: number, color?: Color, type?: ActionCardType): string => {
        if (value !== undefined && color !== undefined) {
            return color.toString().toLowerCase() + '-' + value + '.png';
        }
        if (color && type) {
            let action = '';
            if(ActionCardType.MORE2 === type) {
                action = '2';
            } else if(ActionCardType.ROTATE === type) {
                action = 'rotate'
            } else if(ActionCardType.STOP === type) {
                action = 'stop'
            }
            return 'action-' + action + '-' + color.toString().toLowerCase() + '.png';
        }
        if (ActionCardType.MORE4 === type) {
            return 'action-4.png'
        }
        if (ActionCardType.SWITCH_COLOR === type) {
            return 'action-switch.png'
        }
        console.log("Cannot resolve " + value + " " + color + " " + type);
        return '';
    }
}