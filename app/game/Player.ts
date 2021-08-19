import { Card } from "./Card";

export class Player {
    _id: string;
    _name: string;
    _cards: Card[] = [];
    
    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
    }

    receiveCard(card: Card) {
        this._cards.push(card);
    }

    discardCard(card: Card) {
        const index = this._cards.indexOf(card);
        this._cards.splice(index, 1);
    }

    get id() {
        return this._id;
    }

    get cards() {
        return this._cards.slice();
    }

    get name() {
        return this._name;
    }
}