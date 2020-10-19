import { GroundObjects } from './ground-objets/GroundObjects';
import { SurfaceTiles } from './surface-tiles/SurfaceTiles';

class Sprites {
  ground: SurfaceTiles;
  objects: GroundObjects;

  initSprites() {
    this.ground = new SurfaceTiles();
    this.objects = new GroundObjects();
  }
}

export const sprites = new Sprites();
