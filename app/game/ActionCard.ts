import { ActionCardType } from "./ActionCardType";
import { Card } from "./Card";
import { CardImageName } from "./CardImageName";

export class ActionCard extends Card {
    private _type: ActionCardType;
    
    constructor(id: string, type: ActionCardType, image?: string) {
        if (image) {
            super(id, 0, image);
        } else {
            super(id, 0, CardImageName.getCardImageName(undefined, undefined, type));
        }
        this._type = type;
    }

    get type() {
        return this._type;
    }
}