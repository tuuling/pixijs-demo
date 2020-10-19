// Structure of the Redux state store. All coordinates in isometric x and y.
export default interface State {
  // current position of the mouse
  mouseCords: { x: number; y: number };
  // current location of the char and where it's walking to
  player: {
    location: { x: number; y: number };
    direction: number;
    destination: { x: number; y: number };
  };
}
