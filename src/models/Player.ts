import { AnimatedSprite, Ticker } from 'pixi.js';
import { sprites } from '../spritesheets/sprites';
import { setPlayerDirection, setPlayerLoc } from '../redux/actions';
import RhombusCord from './RhombusCord';
import store from '../redux/store';
import { MathUtils, Vector2 } from 'three';
import radToDeg = MathUtils.radToDeg;

export const DIRECTION_N = 1;
export const DIRECTION_S = 2;
export const DIRECTION_E = 3;
export const DIRECTION_W = 4;

export class Player {
  sprite: AnimatedSprite;
  private destination: { x: number; y: number } = null;
  private location: { x: number; y: number };
  private direction: number;

  private moveTicker: (delta: number) => void;

  private framerate = 60;
  private speed = 1;

  constructor() {
    this.sprite = new AnimatedSprite(sprites.objects.animations.player);
    this.sprite.animationSpeed = 0.15;
    this.initPlayer();
  }

  private initPlayer() {
    const cord = RhombusCord.fromKey('-1x2');

    setPlayerLoc(cord.pixel);

    store.state$.subscribe(({ player: { destination, location, direction } }) => {
      // new destination

      if (location) {
        this.location = location;
        this.sprite.position.set(location.x, location.y);
      }

      if (direction && this.direction !== direction) {
        this.direction = direction;
        switch (this.direction) {
          case DIRECTION_N:
            this.sprite.textures = sprites.objects.animations.player;
            this.sprite.textures.map(t => t.rotate = 0);
            break;
          case DIRECTION_S:
            this.sprite.textures = sprites.objects.animations.playerFront;
            this.sprite.textures.map(t => t.rotate = 0);
            break;
          case DIRECTION_E:
            this.sprite.textures = sprites.objects.animations.player;
            this.sprite.textures.map(t => t.rotate = 12);
            break;
          case DIRECTION_W:
            this.sprite.textures = sprites.objects.animations.playerFront;
            this.sprite.textures.map(t => t.rotate = 12);
            break;
        }
      }

      if (
        destination &&
        (this.destination?.x !== destination.x || this.destination?.y !== destination.y)
      ) {
        this.destination = destination;
        this.animateLocation();
      }

    });

  }

  private animateLocation() {
    Ticker.shared.remove(this.moveTicker);

    const target = RhombusCord.fromPixel(this.destination);

    const currentIso = RhombusCord.pixelToIso(target.pixel.x, target.pixel.y, 2);
    const prevIso = RhombusCord.pixelToIso(this.location.x, this.location.y, 2);

    const isoVector = new Vector2(currentIso.isoX - prevIso.isoX, currentIso.isoY - prevIso.isoY);
    const pixelVector = new Vector2(target.pixel.x - this.location.x, target.pixel.y - this.location.y);

    const speedVector = new Vector2(
      pixelVector.x / isoVector.length() / this.framerate * this.speed,
      pixelVector.y / isoVector.length() / this.framerate * this.speed
    );

    let remainingVector = pixelVector.clone();

    let direction = DIRECTION_S;

    {
      const angle = radToDeg(speedVector.angle());
      if (angle >= 0 && angle <= 90) {
        direction = DIRECTION_S;
      } else if (angle > 90 && angle <= 180) {
        direction = DIRECTION_W;
      } else if (angle > 180 && angle <= 270) {
        direction = DIRECTION_N;
      } else if (angle > 270) {
        direction = DIRECTION_E;
      }
    }

    setPlayerDirection(direction);
    this.sprite.gotoAndPlay(0);

    this.moveTicker = (delta) => {

      // arrived at location
      if (remainingVector.lengthSq() <= speedVector.lengthSq()) {

        Ticker.shared.remove(this.moveTicker);
        setPlayerLoc(this.destination);
        this.sprite.gotoAndStop(0);
      // keep walking
      } else {
        setPlayerLoc({
          x: Math.round(target.pixel.x - remainingVector.x),
          y: Math.round(target.pixel.y - remainingVector.y)
        });

        remainingVector = remainingVector.sub(speedVector.clone().multiplyScalar(delta));
      }
    };

    Ticker.shared.add(this.moveTicker);

  }
}
