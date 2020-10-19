import { BaseTexture, Spritesheet, Texture } from 'pixi.js';
import sprite from './sprite.png';
import atlas from './atlas.json';

export class GroundObjects extends Spritesheet {
  constructor() {
    const baseTexture = new BaseTexture(sprite, { resolution: 1 });
    super(baseTexture, atlas);
    super.parse((...params) => {
      console.log(params);
    });
  }

  textures: {
    house: Texture;
    tree: Texture;
    hedge: Texture;
    player_1: Texture;
    playerFront_1: Texture;
  };

  animations: {
    player: Texture[];
    playerFront: Texture[];
  };
}
