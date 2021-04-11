import { PointerEventTypes, Vector3 } from "@babylonjs/core";


export default class Camera2DMouseInputs {
  constructor(touchEnabled) {
    if (touchEnabled === void 0) { touchEnabled = true; }
    this.touchEnabled = touchEnabled;
    this.buttons = [0, 1, 2];
  }
  //add attachment control which also contains the code to react to the input from the mouse 
  attachControl(noPreventDefault) {
    var _this = this;
    var camera = this.camera;
    var engine = this.camera.getEngine();
    var element = engine.getInputElement();
    if (!this._pointerInput) {
      this._pointerInput = function (p, s) {
        var evt = p.event;
        if (!_this.touchEnabled && evt.pointerType === "touch") {
          return;
        }
        if (p.type !== PointerEventTypes.POINTERMOVE && _this.buttons.indexOf(evt.button) === -1) {
          return;
        }
        if (p.type === PointerEventTypes.POINTERDOWN) {
          try {
            evt.srcElement.setPointerCapture(evt.pointerId);
          }
          catch (e) {
            //Nothing to do with the error. Execution will continue.
          }
          _this.previousPosition = {
            x: evt.clientX,
            y: evt.clientY
          };
          if (!noPreventDefault) {
            evt.preventDefault();
            element.focus();
          }
        }
        else if (p.type === PointerEventTypes.POINTERUP) {
          try {
            evt.srcElement.releasePointerCapture(evt.pointerId);
          }
          catch (e) {
            //Nothing to do with the error.
          }
          _this.previousPosition = null;
          if (!noPreventDefault) {
            evt.preventDefault();
          }
        }
        else if (p.type === PointerEventTypes.POINTERMOVE) {
          if (!_this.previousPosition || engine.isPointerLock) {
            return;
          }
          var offsetX = evt.clientX - _this.previousPosition.x;
          var offsetY = evt.clientY - _this.previousPosition.y;
          if (!_this.camera.getScene().useRightHandedSystem) {
            offsetX = -offsetX;
          }
          console.log(evt);
          camera.direction.copyFromFloats(offsetX, offsetY, 0);
          _this.previousPosition = {
            x: evt.clientX,
            y: evt.clientY
          };
          if (!noPreventDefault) {
            evt.preventDefault();
          }
          camera.getViewMatrix().invertToRef(camera._cameraTransformMatrix);
          Vector3.TransformNormalToRef(camera.direction, camera._cameraTransformMatrix, camera._transformedDirection);
          camera.cameraDirection.addInPlace(camera._transformedDirection);
        }
      };
    }
    this._onSearchMove = function (evt) {
      if (!engine.isPointerLock) {
        return;
      }
      var offsetX = evt.movementX || evt.mozMovementX || evt.webkitMovementX || evt.msMovementX || 0;
      var offsetY = evt.movementY || evt.mozMovementY || evt.webkitMovementY || evt.msMovementY || 0;
      if (!_this.camera.getScene().useRightHandedSystem) {
        offsetY = -offsetY;
      }
      camera.direction.copyFromFloats(offsetX, offsetY, 0);
      _this.previousPosition = null;
      if (!noPreventDefault) {
        evt.preventDefault();
      }
      camera.getViewMatrix().invertToRef(camera._cameraTransformMatrix);
      Vector3.TransformNormalToRef(camera.direction, camera._cameraTransformMatrix, camera._transformedDirection);
      camera.cameraDirection.addInPlace(camera._transformedDirection);
    };
    this._observer = this.camera.getScene().onPointerObservable.add(this._pointerInput, PointerEventTypes.POINTERDOWN | PointerEventTypes.POINTERUP | PointerEventTypes.POINTERMOVE);
    element.addEventListener("mousemove", this._onSearchMove, false);
  }
  //Add detachment control
  detachControl() {
    var engine = this.camera.getEngine();
    var element = engine.getInputElement();
    if (this._observer && element) {
      this.camera.getScene().onPointerObservable.remove(this._observer);
      element.removeEventListener("mousemove", this._onSearchMove);
      this._observer = null;
      this._onSearchMove = null;
      this.previousPosition = null;
    }
  }
  //Add the two required functions for names
  getClassName() {
    return "Camera2DMouseInputs";
  }
  getSimpleName() {
    return "MouseSearchCamera";
  }
}




