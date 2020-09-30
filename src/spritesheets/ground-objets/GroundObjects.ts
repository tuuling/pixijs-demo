import {BaseTexture, Spritesheet} from "pixi.js";
import sprite from "./sprite.png";
import atlas from "./atlas.json"

export class GroundObjects extends Spritesheet {
    constructor() {
        const baseTexture = new BaseTexture(sprite, {resolution: 1});
        super(baseTexture, atlas);
        super.parse(() => {});
    }
}