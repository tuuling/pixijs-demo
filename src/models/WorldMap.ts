import { BaseTexture, Container, ParticleContainer, Sprite, Texture } from "pixi.js";
import RhombusCord from './RhombusCord';


import house from '../images/house.png';
import groundsheet from '../spritesheets/Groundsheet';

export default class WorldMap {
  private ground = new Map<string, { type: string }>()
  private objects = new Map<string, string>()
  container = new Container();

  constructor(map = { ground: {}, objects: {} }) {
    // map all the ground tiles
    Object.keys(map.ground).forEach((offsetKey: string) => {

      const cord = RhombusCord.fromOffsetKey(offsetKey);
      this.ground.set(cord.key, map.ground[offsetKey])

    });

    // map all the object on map
    Object.keys(map.objects).forEach((offsetKey: string) => {

      const cord = RhombusCord.fromOffsetKey(offsetKey);
      this.objects.set(cord.key, map.objects[offsetKey])

    });

    this.createStage()
  }

  private createStage() {
    const groundCont = new ParticleContainer();
    const objCont = new Container();

    this.ground.forEach((value, key) => {
      const cord = RhombusCord.fromKey(key);
      const tile = new Sprite(groundsheet.textures[value.type])
      tile.x = cord.pixel.x;
      tile.y = cord.pixel.y;
      groundCont.addChild(tile);
    });

    this.objects.forEach((value, key) => {
      const cord = RhombusCord.fromKey(key);

      if (value === 'house') {
        const baseTexture = new BaseTexture(house, { resolution: 2 });
        const sprite = new Sprite(new Texture(baseTexture))
        sprite.pivot.set(41, 182);
        sprite.position.set(cord.pixel.x, cord.pixel.y)

        objCont.addChild(sprite);
      }

    })

    this.container.addChild(groundCont, objCont);
  }
}
