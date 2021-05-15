import { Vector3, Tools } from "@babylonjs/core";

export default class Camera2DKeyboardInputs {
  constructor() {
    this._keys = [];
    this.keysUp = [38];
    this.keysDown = [40];
    this.keysLeft = [37];
    this.keysRight = [39];
  }
  //Add attachment controls
  attachControl(noPreventDefault) {
    var _this = this;
    var engine = this.camera.getEngine();
    var element = engine.getInputElement();
    if (!this._onKeyDown) {
      element.tabIndex = 1;
      this._onKeyDown = function (evt) {
        if (_this.keysUp.indexOf(evt.keyCode) !== -1 ||
          _this.keysDown.indexOf(evt.keyCode) !== -1 ||
          _this.keysLeft.indexOf(evt.keyCode) !== -1 ||
          _this.keysRight.indexOf(evt.keyCode) !== -1) {
          var index = _this._keys.indexOf(evt.keyCode);
          if (index === -1) {
            _this._keys.push(evt.keyCode);
          }
          if (!noPreventDefault) {
            evt.preventDefault();
          }
        }
      };
      this._onKeyUp = function (evt) {
        if (_this.keysUp.indexOf(evt.keyCode) !== -1 ||
          _this.keysDown.indexOf(evt.keyCode) !== -1 ||
          _this.keysLeft.indexOf(evt.keyCode) !== -1 ||
          _this.keysRight.indexOf(evt.keyCode) !== -1) {
          var index = _this._keys.indexOf(evt.keyCode);
          if (index >= 0) {
            _this._keys.splice(index, 1);
          }
          if (!noPreventDefault) {
            evt.preventDefault();
          }
        }
      };
      element.addEventListener("keydown", this._onKeyDown, false);
      element.addEventListener("keyup", this._onKeyUp, false);
    }
  }
  //Add detachment controls
  detachControl() {
    // ================ BUG !!! ==================
    // var engine = this.camera.getEngine();
    // var element = engine.getInputElement();
    // if (this._onKeyDown) {
    //   element.removeEventListener("keydown", this._onKeyDown);
    //   element.removeEventListener("keyup", this._onKeyUp);
    //   Tools.UnregisterTopRootEvents([
    //     { name: "blur", handler: this._onLostFocus }
    //   ]);
    //   this._keys = [];
    //   this._onKeyDown = null;
    //   this._onKeyUp = null;
    // }
  }
  //Keys movement control by checking inputs
  checkInputs() {
    if (this._onKeyDown) {
      const camera = this.camera;
      for (let index = 0; index < this._keys.length; index++) {
        const keyCode = this._keys[index];
        const speed = camera.speed;
        if (this.keysLeft.indexOf(keyCode) !== -1) {
          camera.position.x -= speed;
        }
        else if (this.keysUp.indexOf(keyCode) !== -1) {
          camera.position.z -= speed;
        }
        else if (this.keysRight.indexOf(keyCode) !== -1) {
          camera.position.x += speed;
        }
        else if (this.keysDown.indexOf(keyCode) !== -1) {
          camera.position.z += speed;
        }
      }
    }
  }
  //Add the onLostFocus function
  _onLostFocus(e) {
    this._keys = [];
  }
  //Add the two required functions for the control Name
  getClassName() {
    return "Camera2DKeyboardInputs";
  }
  getSimpleName() {
    return "keyboard";
  }
}







