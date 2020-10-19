import { Container, InteractionEvent, ParticleContainer, Rectangle, Sprite } from 'pixi.js';
import RhombusCord from './RhombusCord';

import { sprites } from '../spritesheets/sprites';
import { setPlayerDest } from '../redux/actions';
import { Player } from './Player';

export default class World {

  private ground = new Map<string, { type: string }>();
  private objects = new Map<string, string>();

  private size = { width: 0, height: 0 };

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
      const cell = RhombusCord.fromPixel(localPoint);

      setPlayerDest(cell.pixel);

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

      const tile = new Sprite(sprites.ground.textures[value.type]);
      tile.position.set(cord.pixel.x, cord.pixel.y);

      this.groundContainer.addChild(tile);
    });
  }

  private createObjects() {
    this.objects.forEach((value, key) => {
      const cord = RhombusCord.fromKey(key);

      const sprite = new Sprite(sprites.objects.textures[value]);
      sprite.position.set(cord.pixel.x, cord.pixel.y);

      this.objectsContainer.addChild(sprite);
    });
  }

  private createPlayer() {
    const player = new Player();

    this.objectsContainer.addChild(player.sprite);

  }

  private calculateSize() {
    this.groundContainer.children.forEach(child => {
      this.size.width = Math.max(this.size.width, child.x + RhombusCord.tileSize.width);
      this.size.height = Math.max(this.size.height, child.y + RhombusCord.tileSize.height);
    });
  }
}
