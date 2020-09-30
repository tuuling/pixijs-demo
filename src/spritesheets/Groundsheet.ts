import { BaseTexture, Spritesheet } from 'pixi.js';
import groundsheet from '../images/ground-sheet.png';

const spriteData = {
  frames: {
    'grass': {
      frame: {x:19,y:9,w:90,h:46},
      rotated: false,
      trimmed: false,
      spriteSourceSize: {x:0,y:0,w:90,h:46},
      sourceSize: {w:90,h:46},
      anchor: {x:0.5,y:0.5}
    },
    'sand': {
      frame: {x:19+128,y:9,w:90,h:46},
      rotated: false,
      trimmed: false,
      spriteSourceSize: {x:0,y:0,w:90,h:46},
      sourceSize: {w:90,h:46},
      anchor: {x:0.5,y:0.5}
    },
  },
  meta: {
    size: {w:512,h:512},
    scale: 1,
  }
}

export class Groundsheet extends Spritesheet {
  constructor() {
    const baseTexture = new BaseTexture(groundsheet, {resolution: 1});
    super(baseTexture, spriteData);
    super.parse(() => {});
  }
}

