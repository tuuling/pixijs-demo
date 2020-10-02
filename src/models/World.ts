import { Container, InteractionEvent, ParticleContainer, Rectangle, Sprite } from 'pixi.js';
import RhombusCord from './RhombusCord';

import { SurfaceTiles } from '../spritesheets/surface-tiles/SurfaceTiles';
import { GroundObjects } from '../spritesheets/ground-objets/GroundObjects';

export default class World {
  private groundsheet = new SurfaceTiles();
  private objectsheet = new GroundObjects();

  private ground = new Map<string, { type: string }>();
  private objects = new Map<string, string>();

  private size = {width: 0, height: 0};

  private groundContainer = new ParticleContainer();
  private objectsContainer = new Container();
  worldContainer = new Container();

  constructor(map = { ground: {}, objects: {} }) {
    // map all the ground tiles
    Object.keys(map.ground).forEach((offsetKey: string) => {

      const cord = RhombusCord.fromOffsetKey(offsetKey);
      this.ground.set(cord.key, map.ground[offsetKey]);

    });

    // map all the object on map
    Object.keys(map.objects).forEach((offsetKey: string) => {

      const cord = RhombusCord.fromOffsetKey(offsetKey);
      this.objects.set(cord.key, map.objects[offsetKey]);

    });

    this.createStage();
    this.createPlayer();
    this.calculateSize();

    this.worldContainer.hitArea = new Rectangle(0, 0, this.size.width, this.size.height);

    // this.worldContainer.position.set(-30, -30);

    this.worldContainer.interactive = true;
    this.worldContainer.on('click', (event: InteractionEvent) => {
      const point = event.data.global;
      const localPoint = this.worldContainer.toLocal(point);
      const cell = RhombusCord.fromPixel(localPoint.x, localPoint.y);

      console.log(cell.key, point, localPoint);
    });
  }

  private createStage() {
    this.createTiles();
    this.createObjects();

    this.worldContainer.addChild(this.groundContainer, this.objectsContainer);
  }

  private createTiles() {
    this.ground.forEach((value, key) => {
      const cord = RhombusCord.fromKey(key);

      const tile = new Sprite(this.groundsheet.textures[value.type]);
      tile.position.set(cord.pixel.x, cord.pixel.y);

      this.groundContainer.addChild(tile);
    });
  }

  private createObjects() {
    this.objects.forEach((value, key) => {
      const cord = RhombusCord.fromKey(key);

      const sprite = new Sprite(this.objectsheet.textures[value]);
      sprite.position.set(cord.pixel.x, cord.pixel.y);

      this.objectsContainer.addChild(sprite);
    });
  }

  private createPlayer() {
    const cord = RhombusCord.fromKey('-1x2');

    const sprite = new Sprite(this.objectsheet.textures.player);
    sprite.position.set(cord.pixel.x, cord.pixel.y);

    this.objectsContainer.addChild(sprite);
  }

  private calculateSize() {
    this.groundContainer.children.forEach(child => {
      this.size.width = Math.max(this.size.width, child.x + RhombusCord.tileSize.width);
      this.size.height = Math.max(this.size.height, child.y + RhombusCord.tileSize.height);
    });
  }
}
