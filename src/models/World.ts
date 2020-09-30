import { Container, ParticleContainer, Sprite } from "pixi.js";
import RhombusCord from './RhombusCord';


import { SurfaceTiles } from '../spritesheets/surface-tiles/SurfaceTiles';
import { GroundObjects } from "../spritesheets/ground-objets/GroundObjects";

export default class World {
  private groundsheet = new SurfaceTiles();
  private objectsheet = new GroundObjects();

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
    const groundCont = this.createTiles();
    const objCont = this.createObjects();

    this.container.addChild(groundCont, objCont);
  }

  private createTiles() {
    const container = new ParticleContainer();

    this.ground.forEach((value, key) => {
      const cord = RhombusCord.fromKey(key);

      const tile = new Sprite(this.groundsheet.textures[value.type])
      tile.position.set(cord.pixel.x, cord.pixel.y)

      container.addChild(tile);
    });

    return container
  }

  private createObjects() {
    const container = new ParticleContainer();

    this.objects.forEach((value, key) => {
      const cord = RhombusCord.fromKey(key);

      const sprite = new Sprite(this.objectsheet.textures[value])
      sprite.position.set(cord.pixel.x, cord.pixel.y)

      container.addChild(sprite);
    })

    return container
  }
}
