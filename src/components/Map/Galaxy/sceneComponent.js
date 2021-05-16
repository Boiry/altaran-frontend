import React, { useEffect, useState, useRef } from "react";
import { Engine, Scene, Color4, UniversalCamera, FreeCameraInputsManager, FlyCamera, DefaultRenderingPipeline, SpriteManager, Sprite, PointerEventTypes, FreeCamera, Vector3, HemisphericLight, MeshBuilder, GlowLayer, Color3, StandardMaterial } from "@babylonjs/core";

import Camera2DKeyboardInputs from "./camera2DKeyboardInputs";
import Camera2DMouseInputs from './camera2DMouseInputs';

// import stars from 'src/assets/galaxyData';
import stars from 'src/assets/miniGalaxyData';
import galaxyWrapper from 'src/assets/galaxyWrapper';
import basicStar from "src/assets/images/basic-star50.png";

export default (props) => {
  const reactCanvas = useRef(null);
  const [scene, setScene] = useState();
  const [camera, setCamera] = useState();
  const { antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender,
    showStarSystemInfo,
    cameraPosition,
    setCameraPosition,
     ...rest } = props;
  useEffect(() => {
    if (reactCanvas.current) {
      const engine = new Engine(reactCanvas.current, antialias, engineOptions, adaptToDeviceRatio);
      const scene = new Scene(engine, sceneOptions);
      scene.clearColor = new Color4(0, 0, 0, 0.7);
      setScene(scene);

      document.getElementById("canvas").focus();
      const camera = new UniversalCamera("UniversalCamera", new Vector3(0, -3000, 0), scene);
      setCamera(camera);
      scene.addCamera(camera);
      if (cameraPosition) {
        camera.position = cameraPosition;
      }

      engine.runRenderLoop(() => {
        if (typeof onRender === "function") {
          onRender(scene);
        }
        scene.render();
      });
      const resize = () => {
        scene.getEngine().resize();
      };
      if (window) {
        window.addEventListener("resize", resize);
      }
      return () => {
        setCameraPosition(camera.position);
        scene.detachControl();
        scene.dispose();
        scene.getEngine().dispose();
        
        if (window) {
          window.removeEventListener("resize", resize);
        }
      };
    }
  }, [reactCanvas]);

  useEffect(() => {
    if (scene) {
      camera.upVector = new Vector3(0, -1, -1);
      camera.maxZ = 20000
      camera.setTarget(new Vector3(camera.position.x, 0, camera.position.z));
      camera.inertia = 0;
      camera.speed = 10;
      camera.fov = 0.8;

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
        star.position.y = stars[i].y - 2000;
        star.position.z = stars[i].z;
        star.isPickable = true;
        star.region = stars[i].region_num;
        star.sector = stars[i].sector_num;
        star.system = stars[i].system_num;
      };

      scene.onPointerDown = function (evt) {
        const pickResult = scene.pickSprite(this.pointerX, this.pointerY);
        if (pickResult.hit) {
          const region = pickResult.pickedSprite.region;
          const sector = pickResult.pickedSprite.sector;
          const starSystem = pickResult.pickedSprite.system;
          showStarSystemInfo(region, sector, starSystem);
        }
      };

      // const blueMat = new StandardMaterial("blueMat", scene);
      // blueMat.emissiveColor = new Color3(0, 0, 1);
      // blueMat.alpha = .2;
      // blueMat.backFaceCulling = false;
      // const wrapper = MeshBuilder.CreatePolyhedron("h", {custom: galaxyWrapper}, scene);
      // wrapper.material = blueMat;

      scene.blockfreeActiveMeshesAndRenderingGroups = false;

      camera.inputs.remove(camera.inputs.attached.keyboard);
      camera.inputs.remove(camera.inputs.attached.mouse);
      
      camera.inputs.addMouseWheel();
      camera.inputs.attached.mousewheel.wheelPrecisionY = 100;

      // add keyboard controls
      camera.inputs.add(new Camera2DKeyboardInputs());

      // add mouse controls
      camera.inputs.add(new Camera2DMouseInputs(scene));
    }

    return () => {
      if (camera) {
        camera.inputs.removeByType("Camera2DMouseInputs");
      }
    }
  }, [scene]);

  return <canvas ref={reactCanvas} {...rest} />;
};
