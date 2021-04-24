import React, { useEffect } from 'react';
import { UniversalCamera, FlyCamera, DefaultRenderingPipeline, SpriteManager, Sprite, PointerEventTypes, FreeCamera, Vector3, HemisphericLight, MeshBuilder, GlowLayer, Color3, StandardMaterial } from "@babylonjs/core";
import SceneComponent from "src/utils/babylonjs/sceneComponent";

import Camera2DKeyboardInputs from "./camera2DKeyboardInputs";

// import stars from 'src/assets/galaxyData';
import stars from 'src/assets/miniGalaxyData';

import basicStar from "src/assets/images/basic-star50.png";
import './galaxy.scss';

const Galaxy = () => {
  const onSceneReady = (scene) => {
    document.getElementById("canvas").focus();
    var camera = new UniversalCamera("UniversalCamera", new Vector3(0, -1500, 0), scene);
    camera.upVector = new Vector3(0, -1, -1);

    // camera.inputs.clear();
    // camera.inputs.addMouse();
    camera.inputs.remove(camera.inputs.attached.keyboard);

    camera.direction = new Vector3(0, 0, 0);
    camera.angularSensibility *= -0.2;
    camera.invertRotation = true;
    camera.inverseRotationSpeed = 1.5;
    camera.noRotationConstraint = true;
    camera.inertia = 0;
    camera.speed = 10;
    camera.fov = 0.8;
    camera.inputs.addMouseWheel();
    camera.inputs.attached.mousewheel.wheelPrecisionY = 100;
    camera.setTarget(Vector3.Zero());

    // Disable default menu from right click
    document.oncontextmenu = function() { return false };

    const canvas = scene.getEngine().getRenderingCanvas();
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Optimizations
    scene.useGeometryIdsMap = true;
    scene.useMaterialMeshMap = true;
    scene.useClonedMeshMap = true;
    scene.blockfreeActiveMeshesAndRenderingGroups = true;
    
    const spriteManagerStars = new SpriteManager("starsManager", basicStar, stars.length, {width: 50, height: 50});
    spriteManagerStars.isPickable = true;
    
    for (let i = 0; i < stars.length; i++) {
      const star = new Sprite(("star"+i), spriteManagerStars);
      star.width = 2;
      star.height = 2;
      star.position.x = stars[i].x;
      star.position.y = stars[i].y;
      star.position.z = stars[i].z;
      star.isPickable = true;
    };
    
    scene.onPointerDown = function (evt) {
      const pickResult = scene.pickSprite(this.pointerX, this.pointerY);
      if (pickResult.hit) {
        console.log(pickResult.pickedSprite.name);
      }
    };
    
    scene.blockfreeActiveMeshesAndRenderingGroups = false;

    // add keyboard controls
    camera.inputs.add(new Camera2DKeyboardInputs());
    
  };

  return (
    <div className="galaxy">
      <div className="background-opacity">
        <SceneComponent antialias onSceneReady={onSceneReady} id="canvas" tabIndex="0" />
      </div>
    </div>
  );
};

export default Galaxy;
