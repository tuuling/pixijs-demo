import { Application, SCALE_MODES, settings } from 'pixi.js';

import map from './maps/map.json';
import { sprites } from './spritesheets/sprites';
import store from './redux/store';

import World from './models/World';

settings.SCALE_MODE = SCALE_MODES.NEAREST;

const app = new Application({
  resizeTo: window,
  resolution: window.devicePixelRatio,
  autoDensity: true,
  antialias: false,
  backgroundColor: 0xFFFFFF
});

store.initStore();
document.body.appendChild(app.view);
sprites.initSprites();

const worldMap = new World(map);

app.stage.addChild(worldMap.worldContainer);

