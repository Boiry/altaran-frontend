import React, { useEffect, useState, useRef } from 'react';
import { UniversalCamera, FlyCamera, DefaultRenderingPipeline, SpriteManager, Sprite, PointerEventTypes, FreeCamera, Vector3, HemisphericLight, MeshBuilder, GlowLayer, Color3, StandardMaterial } from "@babylonjs/core";
import SceneComponent from "src/utils/babylonjs/sceneComponent";

import Camera2DKeyboardInputs from "./camera2DKeyboardInputs";

// import stars from 'src/assets/galaxyData';
import stars from 'src/assets/miniGalaxyData';
import galaxyWrapper from 'src/assets/galaxyWrapper';

import basicStar from "src/assets/images/basic-star50.png";
import './galaxy.scss';

const Galaxy = ({
  launchFetchStarSystem,
  goToStarSystemPage,
  starSystemName,
  changeField,
  launchDeleteStarSystemName,
}) => {
  // ==================== INPUTS ======================

  const info = useRef();
  const name = useRef();
  const coordinates = useRef();
  let [regionSelected, setRegionSelected] = useState();
  let [sectorSelected, setSectorSelected] = useState();
  let [starSystemSelected, setStarSystemSelected] = useState();
  
  const showStarSystemInfo = (region, sector, starSystem) => {
    launchDeleteStarSystemName();
    launchFetchStarSystem(region, sector, starSystem);
    setRegionSelected(region);
    setSectorSelected(sector);
    setStarSystemSelected(starSystem);
    const coordinatesString = `${region} : ${sector} : ${starSystem}`;
    coordinates.current.textContent = coordinatesString;
    name.current.style.fontSize = "1rem";
    name.current.style.fontStyle = "italic";
    name.current.textContent = "Loading...";
    info.current.style.display = "block";
    setTimeout(() => {info.current.focus()}, 500);
  }

  useEffect(() => {
    name.current.style.fontSize = "1.4rem";
    name.current.style.fontStyle = "none";
    name.current.textContent = starSystemName;
  }, [starSystemName])

  const clickOnGoStarSystem = () => {
    changeField(regionSelected, 'region');
    changeField(sectorSelected, 'sector');
    changeField(starSystemSelected, 'starSystem');
    goToStarSystemPage();
  }

  const hideInfo = () => {
    info.current.style.display = "none";
  }

  useEffect(() => {
    hideInfo();
  }, [])

  // ================ BABYLON =================
  const onSceneReady = (scene) => {
    document.getElementById("canvas").focus();
    var camera = new UniversalCamera("UniversalCamera", new Vector3(0, -2000, 0), scene);
    camera.upVector = new Vector3(0, -1, -1);
    camera.maxZ = 20000;

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
    
    const blueMat = new StandardMaterial("blueMat", scene);
    blueMat.emissiveColor = new Color3(0, 0, 1);
    blueMat.alpha = .2;
    blueMat.backFaceCulling = false;

    // const wrapper = MeshBuilder.CreatePolyhedron("h", {custom: galaxyWrapper}, scene);
    // wrapper.material = blueMat;

    scene.blockfreeActiveMeshesAndRenderingGroups = false;

    // add keyboard controls
    camera.inputs.add(new Camera2DKeyboardInputs());
    
  };

  return (
    <>
      <div className="galaxy">
        <div className="background-opacity">
          <SceneComponent antialias onSceneReady={onSceneReady} id="canvas" tabIndex="0" />
        </div>
      </div>
      <div ref={info} className="galaxy-star-info" tabIndex="1" onBlur={hideInfo}>
        <p ref={name} className="galaxy-star-info-name">Test</p>
        <p ref={coordinates} className="galaxy-star-into-coordinates">Test test test</p>
        <button className="galaxy-star-info-button" onMouseDown={() => clickOnGoStarSystem()}>Y aller</button>
      </div>
      <aside className="aside"></aside>
    </>
  );
};

export default Galaxy;
