import React from 'react';
import { HemisphericLight, ArcRotateCamera, UniversalCamera, FlyCamera, DefaultRenderingPipeline, SpriteManager, Sprite, PointerEventTypes, FreeCamera, Vector3, PointLight, MeshBuilder, GlowLayer, Color3, Color4, StandardMaterial } from "@babylonjs/core";
import SceneComponent from "src/utils/babylonjs/sceneComponent";

import './starSystem.scss';

const StarSystem = () => {
  const onSceneReady = (scene) => {
    document.getElementById("canvas").focus();
    const camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2.5, 95, new Vector3(25, 5, 0), scene);
    // camera.inputs.clear();

    // This positions the camera
    camera.setPosition(new Vector3(25, 15, -40));

    const canvas = scene.getEngine().getRenderingCanvas();
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new PointLight("light", new Vector3(0, 0, 0), scene);
    light.intensity = 1;

    const light2 = new HemisphericLight("light2", new Vector3(0, 1, 0), scene);
    light2.intensity = 0.5;

    // Create the star
    const star = MeshBuilder.CreateSphere("star", {diameter: 6}, scene);
    const glowLayer = new GlowLayer("glow", scene, { 
      mainTextureFixedSize: 256,
      blurKernelSize: 64
    });
    glowLayer.intensity = 1;
    star.material = new StandardMaterial("red", scene);
    star.material.emissiveColor = new Color3(0.8,0.4,0.4);
    glowLayer.addIncludedOnlyMesh(star);

    // Create orbits
    let circlePoints = [];
    let pointsColor = [];
	  const makeCircle = (radius, resolution) => {
      const pi2 = Math.PI * 2;
      const step = pi2 / resolution;
      for (let i=0; i<pi2; i+=step) {
        const x = Math.cos(i) * radius;
			  const z = Math.sin(i) * radius;
        circlePoints.push(new Vector3(x, 0, z));
        pointsColor.push(new Color4(1, 1, 1, .5));
      };
    };

    for (let i=10; i<=45; i+=5) {
      makeCircle(i, 100);
      MeshBuilder.CreateLines("circle", {points: circlePoints, colors: pointsColor}, scene);
      circlePoints = [];
    };

    // Create planets and moons
    const material = new StandardMaterial(scene);
    material.diffuseColor = new Color3(0.4, 0.9, 0.9);
    for (let i=10; i<=45; i+=5) {
      const planet = MeshBuilder.CreateSphere("planet", {diameter: 2}, scene);
      planet.material = material;
      planet.position = new Vector3(i, 0, 0);
      planet.isPickable = true;
      for (let j=2; j<=10; j+=2) {
        const moon = MeshBuilder.CreateSphere("moon", {diameter: 1.3}, scene);
        moon.material = material;
        moon.position = new Vector3(i, j+.5, 0);
      }
    };

  };
  return (
    <div className="star-system">
      <SceneComponent antialias onSceneReady={onSceneReady} id="canvas" tabIndex="0" />
    </div>
  );
};

export default StarSystem;
