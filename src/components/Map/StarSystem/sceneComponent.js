import React, { useEffect, useState, useRef } from "react";
import '@babylonjs/loaders/glTF';

import {
  Engine,
  Scene,
  HemisphericLight,
  ArcRotateCamera,
  Mesh,
  VertexData,
  ParticleSystem,
  Texture,
  Vector3,
  PointLight,
  MeshBuilder,
  GlowLayer, 
  Color3,
  Color4,
  StandardMaterial,
  SceneLoader,
} from "@babylonjs/core";

import gasCloudTexture from 'src/assets/images/gas_cloud.png';

export default (props) => {
  const reactCanvas = useRef(null);
  const { antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, starSystemInfo, showEntityInfo, ...rest } = props;
  const [engine, setEngine] = useState();
  const [scene, setScene] = useState();
  
  useEffect(() => {
    if (reactCanvas.current) {
      const engine = new Engine(reactCanvas.current, antialias, engineOptions, adaptToDeviceRatio);
      setEngine(engine);
      
      return () => {
        engine.dispose();
      }
    }
  }, [reactCanvas]);
  
  const starsSpecs = {
    RED_DWARF: {r: ".8", g: ".3", b: ".3", intensity:"1", diameter: "4"},
    YELLOW_DWARF: {r: ".8", g: ".7", b: ".3", intensity:".8", diameter: "4"},
    WHITE_DWARF: {r: ".8", g: ".75", b: ".7", intensity:".8", diameter: "4"},
    NEUTRON_STAR: {r: ".35", g: ".65", b: ".9", intensity:"1", diameter: "1"},
    WOLF_RAYET: {r: ".5", g: ".7", b: ".9", intensity:".8", diameter: "6"},
    POPULATION_III: {r: ".5", g: ".9", b: ".9", intensity:".8", diameter: "7"},
    BLACK_HOLE: {r: "0", g: "0", b:"0", intensity:".5", diameter: "4"},
    SUPERMASSIVE_BLACK_HOLE: {r: "0", g: "0", b:"0", intensity:".5", diameter: "6"}
  };
  const planetsSpecs = {
    CHTHONIAN_PLANET: {r: ".5", g: ".15", b: ".06", diameter: "2.7"},
    METALLIC_PLANET: {r: ".3", g: ".3", b: ".3", diameter: "2"},
    OCEAN_PLANET: {r: ".1", g: ".1", b:".6", diameter: "2"},
    GAS_GIANT: {r: ".4", g: ".1", b: ".5", diameter: "2"},
    HABITABLE_PLANET: {r: ".3", g: ".4", b: ".1", diameter: "2"},
    LAVA_PLANET: {r: "7", g: ".05", b: ".05", diameter: "2"},
    SUPER_JOVIAN: {r: ".55", g: ".6", b: ".65", diameter: "3"},
    SOLID_MASSIVE_PLANET: {r: ".3", g: ".2", b: ".05", diameter: "2.7"},
    CARBON_PLANET: {r: "1.5", g: "1.5", b: "1.5", diameter: "2"},
    FROZEN_PLANET: {r: "1", g: "1", b: "1", diameter: "2"},
    MEGA_HABITABLE_PLANET: {r: ".3", g: ".4", b: ".1", diameter: "3"}
  };

  useEffect(() => {
    if (scene) scene.dispose();
    if (scene && props.starSystemInfo === 'no system') {
      console.log(scene.cameras)
      return;
    }
    if (props.starSystemInfo && engine) {
      const scene = new Scene(engine, sceneOptions);
      setScene(scene);
      scene.clearColor = new Color4(0, 0, 0, 0);
      engine.runRenderLoop(() => {
        if (typeof onRender === "function") {
          onRender(scene);
        }
        scene.render();
      });

      const camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2.5, 95, new Vector3(25, 8, 0), scene);
      scene.addCamera(camera);
      camera.setPosition(new Vector3(25, 15, -40));

      // Camera movements
      camera.attachControl(canvas, true);

      // Specifications according to the current star
      let specs = starsSpecs[props.starSystemInfo.central.type];

      // Lights
      const light = new PointLight("light", new Vector3(0, 0, 0), scene);
      light.intensity = specs.intensity;
      light.diffuse = new Color3(specs.r, specs.g, specs.b);
      // light.specular = new Color3(specs.r, specs.g, specs.b);


      const light2 = new HemisphericLight("light2", new Vector3(-1, 0, 0), scene);
      light2.intensity = specs.intensity;
      light2.diffuse = new Color3(.75, .75, .5);
      // light2.specular = new Color3(.75, .75, .5);

      // Create the star
      const star = MeshBuilder.CreateSphere("star", {diameter: specs.diameter}, scene);
      const glowLayer = new GlowLayer("glow", scene, { 
        mainTextureFixedSize: 256,
        blurKernelSize: 64
      });
      glowLayer.intensity = specs.intensity;
      star.material = new StandardMaterial("starMaterial", scene);
      star.material.emissiveColor = new Color3(specs.r, specs.g, specs.b);
      star.id = props.starSystemInfo.central.id;
      star.name = props.starSystemInfo.central.name;
      star.type = props.starSystemInfo.central.type;
      glowLayer.addIncludedOnlyMesh(star);

      // SceneLoader.ImportMesh("", "./models/celestial_bodies/white_dwarf/glb/", "etoileblanchesanseffetxenu.glb", scene, function (newMesh) {
        // newMesh.convertToFlatShadedMesh();
      // });

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
        const circle = MeshBuilder.CreateLines("circle", {points: circlePoints, colors: pointsColor}, scene);
        circle.isPickable = false;
        circlePoints = [];
      };

      const entities = starSystemInfo.central.entities;

      // Create planets and moons

      for (let i=0; i<8; i++) {
        if (entities[i]) {
          const x = 5 * i + 10;
          const type = entities[i].type;
          // Secondary stars
          if (type === "RED_DWARF" || type === "YELLOW_DWARF" || type === "WHITE_DWARF" || type === "NEUTRON_STAR" || type === "WOLF_RAYET" || type === "POPULATION_III") {
            const specs = starsSpecs[entities[i].type];
            const secondaryStar = MeshBuilder.CreateSphere("secondaryStar", {diameter: specs.diameter/1.5}, scene);
            
            const light = new PointLight("light", new Vector3(x, 0, 0), scene);
            light.intensity = specs.intensity/1.5;
            light.diffuse = new Color3(specs.r, specs.g, specs.b);
            light.specular = new Color3(specs.r, specs.g, specs.b);
            
            const glowLayer = new GlowLayer("glow", scene, { 
              mainTextureFixedSize: 256,
              blurKernelSize: 64
            });
            glowLayer.intensity = specs.intensity;
            secondaryStar.material = new StandardMaterial("starMaterial", scene);
            secondaryStar.material.emissiveColor = new Color3(specs.r, specs.g, specs.b);
            glowLayer.addIncludedOnlyMesh(secondaryStar);
            secondaryStar.position = new Vector3(x, 0, 0);

          // Asteroid Fields
          } else if (type === "ASTEROID_FIELD") {
            const positions = [
              -1.1, 0.9, -0.5,
              -1.4, -0.6, -0.3,
              -1, -1.3, 1.1,
              -1.1, 0.8, 0.8,
              1, 1, -0.5,
              1, -1, -1,
              0.3, -1.2, 0.9,
              -0.3, 0.8, 0.5
            ];
            const indices = [
              0, 2, 1,
              2, 0, 3,
              1, 4, 0,
              1, 5, 4,
              2, 3, 7,
              2, 7, 6,
              1, 6, 5,
              1, 2, 6,
              0, 4, 3,
              4, 7, 3,
              5, 6, 4,
              6, 7, 4
            ];
            var normals = [];
            VertexData.ComputeNormals(positions, indices, normals);
            let vertexData = new VertexData();
            vertexData.positions = positions;
            vertexData.indices = indices;
            vertexData.normals = normals;

            let asteroid1 = new Mesh("custom1", scene);
            vertexData.applyToMesh(asteroid1);
            asteroid1.scaling = new Vector3(0.4, 0.4, 0.4);
            asteroid1.position = new Vector3(x, 1, 0);

            let asteroid2 = new Mesh("custom2", scene);
            vertexData.applyToMesh(asteroid2);
            asteroid2.scaling = new Vector3(0.3, 0.3, 0.2);
            asteroid2.rotation = new Vector3(1, 1, 1);
            asteroid2.position = new Vector3(x+0.5, -0.6, 0);

            let asteroid3 = new Mesh("custom3", scene);
            vertexData.applyToMesh(asteroid3);
            asteroid3.scaling = new Vector3(0.4, 0.3, 0.4);
            asteroid3.rotation = new Vector3(2, 2, 2);
            asteroid3.position = new Vector3(x-0.5, 0, 0.5);

            let asteroid4 = new Mesh("custom4", scene);
            vertexData.applyToMesh(asteroid4);
            asteroid4.scaling = new Vector3(0.2, 0.3, 0.3);
            asteroid4.rotation = new Vector3(3, 1, 2);
            asteroid4.position = new Vector3(x+.7, 0, -0.5);

            let asteroid5 = new Mesh("custom5", scene);
            vertexData.applyToMesh(asteroid5);
            asteroid5.scaling = new Vector3(0.2, 0.1, 0.2);
            asteroid5.rotation = new Vector3(1.5, 0, 0);
            asteroid5.position = new Vector3(x, -0.4, 0.4);

          // Gas cloud
          } else if (type === "GAS_CLOUD") {
            const particleSystem = new ParticleSystem("particles", 2000);
            particleSystem.particleTexture = new Texture(gasCloudTexture);
            particleSystem.emitter = new Vector3(x, 0, 0);
            particleSystem.start();

          // Planets
          } else {
            specs = planetsSpecs[props.starSystemInfo.central.entities[i].type];
            const material = new StandardMaterial(scene);
            material.diffuseColor = new Color3(specs.r, specs.g, specs.b);
            const planet = MeshBuilder.CreateSphere("planet", {diameter: specs.diameter}, scene);
            planet.material = material;
            planet.position = new Vector3(x, 0, 0);
            planet.isPickable = true;
            planet.id = props.starSystemInfo.central.entities[i].id;
            planet.name = props.starSystemInfo.central.entities[i].name;
            planet.type = props.starSystemInfo.central.entities[i].type;
          }

          // Moons
          for (let j=0; j<5; j++) {
            if (entities[i].moons) {
              const moonSpec = entities[i].moons;
              if (moonSpec[j]) {
                specs = planetsSpecs[moonSpec[j].type];
                const material = new StandardMaterial(scene);
                material.diffuseColor = new Color3(specs.r, specs.g, specs.b);
                const moon = MeshBuilder.CreateSphere("moon", {diameter: specs.diameter / 1.5}, scene);
                moon.material = material;
                const y = 2 * j + 2.5;
                moon.position = new Vector3(x, y, 0);
                moon.id = moonSpec[j].id;
                moon.name = moonSpec[j].name;
                moon.type = moonSpec[j].type;
              }
            }
          }
        }
      }

      // Click on an entity
      scene.onPointerDown = function (evt, pickResult) {
        if (pickResult.hit) {
          props.showEntityInfo(pickResult.pickedMesh.id, pickResult.pickedMesh.name, pickResult.pickedMesh.type);
        }
      };

    }
  }, [props.starSystemInfo])

  return <canvas ref={reactCanvas} {...rest} />;
};
