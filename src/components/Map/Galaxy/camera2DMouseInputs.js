import { Vector3 } from "@babylonjs/core";

export default class Camera2DKeyboardInputs {
  constructor(scene) {
    this._scene = scene;
    this._mouse = "";
    this._mousePrevX = "";
    this._mousePrevY = "";
    this._mouseX = "";
    this._mouseY = "";
  }
};

//Add attachment controls
Camera2DKeyboardInputs.prototype.attachControl = function(noPreventDefault) {
  const engine = this.camera.getEngine();
  const element = engine.getInputElement();
  const camera = this.camera;

  this._onMouseDown = (e) => {
    this._mouse = "down";
    this._mousePrevX = e.clientX;
    this._mousePrevY = e.clientY;
  }

  this._onMouseMove = (e) => {
    if (this._mouse === "down") {
      const offsetX = this._mousePrevX - e.clientX;
      const offsetY = this._mousePrevY - e.clientY;
      const modifier = Math.pow(10, Math.abs(camera.position.y) / 10000);
      camera.position.x += offsetX * modifier;
      camera.position.z += offsetY * modifier;
      camera.setTarget(new Vector3(camera.position.x, 0, camera.position.z));
      this._mousePrevX = e.clientX;
      this._mousePrevY = e.clientY;
    }
  }

  this._onMouseUp = () => {
    this._mouse = "up";
  }

  this._onWheel = (e) => {
    let modifier = Math.pow(100, Math.abs(camera.position.y) / 10000);
    if (modifier >= 200) modifier = 200;
    camera.position.y -= e.deltaY * modifier;
  }

  element.addEventListener("pointerdown", this._onMouseDown);
  element.addEventListener("pointermove", this._onMouseMove);
  element.addEventListener("pointerup", this._onMouseUp);
  element.addEventListener("wheel", this._onWheel); 
};

// Necessary even if empty
Camera2DKeyboardInputs.prototype.detachControl = function() {
  this._scene = "";
  this._mouse = "";
  this._mousePrevX = "";
  this._mousePrevY = "";
  this._mouseX = "";
  this._mouseY = "";
};

//Add the two required functions for the control Name
Camera2DKeyboardInputs.prototype.getClassName = function() {
  return "Camera2DMouseInputs";
};
Camera2DKeyboardInputs.prototype.getSimpleName = function() {
  return "Mouse";
}
