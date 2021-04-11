import { PointerEventTypes, Vector3, MeshBuilder } from "@babylonjs/core";


export default class Camera2DMouseInputs {
  constructor() {}
  
  attachControl(noPreventDefault) {
    const _this = this;
    const camera = this.camera;
    const engine = this.camera.getEngine();
    const element = engine.getInputElement();
    const canvasSize = {
      width: document.getElementById('canvas').width,
      height: document.getElementById('canvas').height
    };
    const ratio = canvasSize.height / canvasSize.width;
    let selection = null;
    let selectionCenter = {
      x:0, y:0, z:0
    };

    this._pointerInput = (pointer) => {
      var event = pointer.event;
      console.log(event.type + ", " + event.buttons);
      switch (event.type) {
        case "pointerdown":
          _this.previousPosition = {
            x: event.clientX,
            y: event.clientY
          }
        break;
        case "pointermove":
          if (!_this.previousPosition) {
            return;
          }
          const offsetX = event.clientX - _this.previousPosition.x;
          const offsetY = event.clientY - _this.previousPosition.y;
          if (event.buttons === 1) {
            camera.direction.copyFromFloats(-offsetX, offsetY, 0);
            camera.getViewMatrix().invertToRef(camera._cameraTransformMatrix);
            Vector3.TransformNormalToRef(camera.direction, camera._cameraTransformMatrix, camera._transformedDirection);
            camera.cameraDirection.addInPlace(camera._transformedDirection);
            _this.previousPosition = {
              x: event.clientX,
              y: event.clientY
            };
          } else if (event.buttons === 2) {
            if (selection) {selection.dispose(); selection = null};
            const x1 = camera.position.x + ((_this.previousPosition.x - (canvasSize.width / 2)) / 914);
            const y1 = camera.position.z + ((_this.previousPosition.y - (canvasSize.height / 2)) / 914);;
            const z = camera.position.y + 1;
            const x2 = (offsetX / 925) + x1;
            const y2 = ((offsetX / 925) * ratio) + y1;
            const points = [
              new Vector3(x1, z, y1),
              new Vector3(x2, z, y1),
              new Vector3(x2, z, y2),
              new Vector3(x1, z, y2),
              new Vector3(x1, z, y1),
            ];
            selection = MeshBuilder.CreateLines("selection", {points});
            // selectionCenter.x = ((x2 - x1) / 2) + x1;
            selectionCenter.y = camera.position.y + (canvasSize.width / offsetX) * 2;
            selectionCenter.x = -((((x2 - x1) / 2) + x1) * selectionCenter.y) / camera.fov;
            selectionCenter.z = ((y2 - y1) / 2) + y1;
            console.log(selectionCenter.y);
          };
        break;
        case "pointerup":
          _this.previousPosition = null;
          if (event.button === 2) {
            const z = selectionCenter.y;
            const x1 = selectionCenter.x;
            const y1 = selectionCenter.z - 100;
            const x2 = selectionCenter.x + 100;
            const y2 = selectionCenter.z + 100;
            const points = [
              new Vector3(x1, z, y1),
              new Vector3(x2, z, y1),
              new Vector3(x2, z, y2),
              new Vector3(x1, z, y2),
              new Vector3(x1, z, y1),
            ];
            const selection2 = MeshBuilder.CreateLines("selection2", {points});

            // camera.position = new Vector3(selectionCenter.x, selectionCenter.y, selectionCenter.z);
            // selection.setEnabled(0);
          };
      }
    }

    this._observer = this.camera.getScene().onPointerObservable.add(this._pointerInput, PointerEventTypes.POINTERDOWN | PointerEventTypes.POINTERUP | PointerEventTypes.POINTERMOVE);
  }

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

  getClassName() {
    return "Camera2DMouseInputs";
  }
  getSimpleName() {
    return "MouseSearchCamera";
  }
}
