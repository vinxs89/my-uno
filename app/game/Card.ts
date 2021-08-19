export abstract class Card {
    private _initValue: number;
    private _image: string;
    private _id: string;
    
    constructor(id: string, initValue: number, image: string) {
        this._id = id;
        this._initValue = initValue;
        this._image = image;
    }

    get id(): string {
        return this._id;
    }

    get initValue(): number {
        return this._initValue;
    }

    get image(): string {
        return this._image;
    }
}