import { BaseTexture, SCALE_MODES, Spritesheet } from 'pixi.js';
import groundsheet from '../images/ground-sheetx1.png';

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
// const baseTexture = new BaseTexture(groundsheet, {resolution: 1, scaleMode: SCALE_MODES.NEAREST});
const baseTexture = new BaseTexture(groundsheet, {resolution: 1});

const sheet = new Spritesheet(baseTexture, spriteData);
sheet.parse(() => {});

export default sheet;

