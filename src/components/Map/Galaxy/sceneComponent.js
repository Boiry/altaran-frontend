import React, { useEffect, useState, useRef } from "react";
import { Engine, Scene, Color4, UniversalCamera, Animation, FreeCameraInputsManager, FlyCamera, DefaultRenderingPipeline, SpriteManager, Sprite, PointerEventTypes, FreeCamera, Vector3, HemisphericLight, MeshBuilder, GlowLayer, Color3, StandardMaterial, Vector2 } from "@babylonjs/core";

import Camera2DKeyboardInputs from "./camera2DKeyboardInputs";
import Camera2DMouseInputs from './camera2DMouseInputs';

// import stars from 'src/assets/galaxyData';
// import stars from 'src/assets/miniGalaxyData';

import * as stars from 'src/assets/galaxy';
// import * as stars from 'src/assets/miniGalaxy';

import galaxyWrapper from 'src/assets/galaxyWrapper';
import basicStar from "src/assets/images/basic-star50.png";
import basicStarHighlight from 'src/assets/images/basic-star-highlight50.png';

export default (props) => {
  const reactCanvas = useRef(null);
  const [scene, setScene] = useState();
  const [camera, setCamera] = useState();
  const { antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender,
    showStarSystemInfo,
    cameraPosition,
    setCameraPosition,
    galaxySelector,
    galaxyRegion,
    galaxySector,
    galaxyStarSystem,
    highlight,
    isolate,
    goAndSee,
    setGoAndSee,
    noSystem,
     ...rest } = props;

  useEffect(() => {
    if (reactCanvas.current) {
      const engine = new Engine(reactCanvas.current, antialias, engineOptions, adaptToDeviceRatio);

      const scene = new Scene(engine, sceneOptions);
      scene.clearColor = new Color4(0, 0, 0, 0.9);
      setScene(scene);

      document.getElementById("canvas").focus();
      const camera = new UniversalCamera("UniversalCamera", new Vector3(0, -7500, 0), scene);
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

  // ============== FILTERS ===============
  let selectedStars = useRef([]);
  let otherStars = useRef([]);
  const starSize = 5;
  useEffect(() => {
    selectedStars.current = [];
    otherStars.current = [];
    if (galaxyRegion) {
      for (let i=1; i<=50; i++) {
        if (parseInt(galaxyRegion) === i) {
          selectedStars.current = [...stars[`r${i}`]];
        } else {
          otherStars.current.push(...stars[`r${i}`]);
        }
      }
    }
    switch (galaxySelector) {
      case "sector": {
        if (galaxyRegion && galaxySector && galaxyRegion > 0 && galaxyRegion < 51) {
          selectedStars.current = [];
          const region = `r${galaxyRegion}`;
          for (let i=0, length=stars[region].length; i<length; i++) {
            if (stars[region][i].sector_num === parseInt(galaxySector)) {
              selectedStars.current.push(stars[region][i]);
            } else {
              otherStars.current.push(stars[region][i]);
            }
          }
        }
        break;
      }
      case "starSystem": {
        if (galaxyRegion && galaxySector && galaxyStarSystem && galaxyRegion > 0 && galaxyRegion < 51) {
          selectedStars.current = [];
          const region = `r${galaxyRegion}`;
          for (let i=0, length=stars[region].length; i<length; i++) {
            if (stars[region][i].sector_num === parseInt(galaxySector) && stars[region][i].system_num === parseInt(galaxyStarSystem)) {
              selectedStars.current.push(stars[region][i]);
            } else {
              otherStars.current.push(stars[region][i]);
            }
          }
        }
        break;
      }
    }
  }, [galaxySelector, galaxyRegion, galaxySector, galaxyStarSystem])

  useEffect(() => {
    let spriteManager;
    let highlightSpriteManager;

    // Without any filters
    if (!highlight && !isolate) {
      let nbStars = 0;
      for (let i=1; i<=50; i++) {
        nbStars += stars[`r${i}`].length;
      }
      spriteManager = new SpriteManager("starsManager", basicStar, nbStars, 50);
      spriteManager.isPickable = true;
      for (let i=1; i<=50; i++) {
        for (let j=0, length=stars[`r${i}`].length; j<length; j++) {
          const star = new Sprite(("star"), spriteManager);
          star.size = starSize;
          star.position.x = stars[`r${i}`][j].x;
          star.position.y = stars[`r${i}`][j].y - 2000;
          star.position.z = stars[`r${i}`][j].z;
          star.isPickable = true;
          star.region = stars[`r${i}`][j].region_num;
          star.sector = stars[`r${i}`][j].sector_num;
          star.system = stars[`r${i}`][j].system_num;
        }
      }

    // With filter
    } else if (highlight) {
      if (selectedStars.current.length > 0) {
        highlightSpriteManager = new SpriteManager("highlightedStarsManager", basicStarHighlight, selectedStars.current.length, 50);
        highlightSpriteManager.isPickable = true;
        for (let i=0, length=selectedStars.current.length; i<length; i++) {
          const star = new Sprite(("star"), highlightSpriteManager);
          star.size = starSize;
          star.position.x = selectedStars.current[i].x;
          star.position.y = selectedStars.current[i].y - 2000;
          star.position.z = selectedStars.current[i].z;
          star.isPickable = true;
          star.region = selectedStars.current[i].region_num;
          star.sector = selectedStars.current[i].sector_num;
          star.system = selectedStars.current[i].system_num;
        }
        spriteManager = new SpriteManager("starsManager", basicStar, otherStars.current.length, 50);
        spriteManager.isPickable = true;
        for (let i=0, length=otherStars.current.length; i<length; i++) {
            const star = new Sprite(("star"), spriteManager);
            star.size = starSize;
            star.position.x = otherStars.current[i].x;
            star.position.y = otherStars.current[i].y - 2000;
            star.position.z = otherStars.current[i].z;
            star.isPickable = true;
            star.region = otherStars.current[i].region_num;
            star.sector = otherStars.current[i].sector_num;
            star.system = otherStars.current[i].system_num;
        }
      } else {
        noSystem();
      }
    } else if (isolate) {
      if (selectedStars.current.length > 0) {
        spriteManager = new SpriteManager("starsManager", basicStar, selectedStars.current.length, 50);
        spriteManager.isPickable = true;
        for (let i=0, length=selectedStars.current.length; i<length; i++) {
          const star = new Sprite(("star"), spriteManager);
          star.size = starSize;
          star.position.x = selectedStars.current[i].x;
          star.position.y = selectedStars.current[i].y - 2000;
          star.position.z = selectedStars.current[i].z;
          star.isPickable = true;
          star.region = selectedStars.current[i].region_num;
          star.sector = selectedStars.current[i].sector_num;
          star.system = selectedStars.current[i].system_num;
        }
      } else {
        noSystem();
      }
    }

    return () => {
      if (spriteManager) spriteManager.dispose();
      if (highlightSpriteManager) highlightSpriteManager.dispose();
    }
  }, [highlight, isolate])

  // ============= CAMERA ANIMATION ==============
  useEffect(() => {
    if (goAndSee) {
      if (selectedStars.current.length === 0) {
        setGoAndSee(false);
        noSystem();
        return;
      }
      setGoAndSee(false);
      // Finding the wanted camera's position
      let x, y, z;
      if (galaxySelector === "region" || galaxySelector === "sector") {
        const aZ = Math.tan((Math.PI / 2) - (camera.fov / 2));
        const aspectRatio = scene.getEngine().getAspectRatio(camera);
        const aX = Math.tan((Math.PI / 2) - ((camera.fov * aspectRatio) / 2));

        function findIntersection(x, y, a) {
          const b = y - (a * x);
          const intersection = (-10000 - b) / a;
          return intersection;
        }

        function calculateCamPos(p1, p2, a) {
          const b1 = p1.y - (-a * p1.x);
          const b2 = p2.y - (a * p2.x);
          const resultX = (b1 - b2) / (a - (-a));
          const resultY = -a * resultX + b1;
          return {x: resultX, y: resultY};
        }

        let minX, maxX, minZ, maxZ;
        for (let i=0; i<selectedStars.current.length; i++) {
          const star = {
            x: selectedStars.current[i].x,
            y: selectedStars.current[i].y - 2000,
            z: selectedStars.current[i].z
          };
          let value = findIntersection(star.x, star.y, -aX);
          if (minX === undefined) {
            minX = {value, star};
          } else if (value < minX.value) {
            minX = {value, star};
          };
          value = findIntersection(star.x, star.y, aX);
          if (maxX === undefined) {
            maxX = {value, star};
          } else if (value > maxX.value) {
            maxX = {value, star};
          };
          value = findIntersection(star.z, star.y, -aZ);
          if (minZ === undefined) {
            minZ = {value, star};
          } else if (value < minZ.value) {
            minZ = {value, star};
          };
          value = findIntersection(star.z, star.y, aZ);
          if (maxZ === undefined) {
            maxZ = {value, star};
          } else if (value > maxZ.value) {
            maxZ = {value, star};
          };
        }

        const camPosX = calculateCamPos({x: minX.star.x, y: minX.star.y}, {x: maxX.star.x, y: maxX.star.y}, aX);
        const camPosZ = calculateCamPos({x: minZ.star.z, y: minZ.star.y}, {x: maxZ.star.z, y: maxZ.star.y}, aZ);
        x = camPosX.x;
        z = camPosZ.x;
        if (camPosX.y < camPosZ.y) {
          y = camPosX.y - 100;
        } else {
          y = camPosZ.y - 100;
        }

      } else {
        const star = selectedStars.current[0];
        x = star.x;
        y = star.y - 2200;
        z = star.z;
      }
      // Animation of the camera
      const animationcamera = new Animation(
        "animationcamera", 
        "position", 
        30, 
        Animation.ANIMATIONTYPE_VECTOR3, 
        Animation.ANIMATIONLOOPMODE_CONSTANT
      );
      let keys = [];
      keys.push({
        frame: 0,
        value: camera.position.clone(),
      });
      keys.push({
        frame: 100,
        value: new Vector3(x, y, z),
      });
      animationcamera.setKeys(keys);
      camera.animations = [];
      camera.animations.push(animationcamera);
      scene.beginAnimation(camera, 0, 100, false, 1);
    }
  }, [goAndSee])

  return <canvas ref={reactCanvas} {...rest} />;
};
