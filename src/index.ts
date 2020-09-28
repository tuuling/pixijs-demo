import {
  Application,
  SCALE_MODES,
  settings
} from 'pixi.js'

import map from './maps/map.json';

import houseimg from './images/house.png';
import WorldMap from './models/WorldMap';

settings.SCALE_MODE = SCALE_MODES.NEAREST;

console.log(settings);

const app = new Application({
  resizeTo: window,
  resolution: window.devicePixelRatio,
  autoDensity: true,
  antialias: false,
  backgroundColor: 0xFFFFFF
});

document.body.appendChild(app.view);

const worldMap = new WorldMap(map);

app.stage.addChild(worldMap.container);

app.loader.add('house', houseimg);
app.loader.load((loader, resources) => {
  console.log(resources);
})
