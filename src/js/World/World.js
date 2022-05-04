import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Loop } from './system/Loop.js';
import { createRenderer } from './system/renderer.js';
import { createScene } from './components/scene.js';
import { createCamera, createDolly } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createFloor } from './components/meshes/floor.js';
import { VrControls } from './system/VrControls.js';
import { hingeComposition } from './components/bodies/hingeComposition.js';
import { sphere } from './components/meshes/sphere.js';
import { physicalMaterialShinyMetal} from './components/materials/physicalMaterial.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { AmmoPhysics, PhysicsLoader } from '@enable3d/ammo-physics';
import { PMREMGenerator } from 'three';
import { matteFrostedPlastics, shinyNoiseMetal, plasticColor } from './components/materials/physicalMaterial.js';

const hdrURL = new URL('/assets/textures/hdr/studio_small_08_2k.hdr', import.meta.url);

class World {
  constructor() {
    this.renderer = createRenderer();
    this.scene = createScene(this.renderer);
    this.camera = createCamera();
    this.lights = createLights(this.scene);
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.floorSize = 12;

    const dolly = createDolly(this.camera, this.scene);
    dolly.position.set(0, 0, 0);
    const vrControls = new VrControls(this.renderer, dolly, this.camera);
    this.loop.updatables.push(vrControls);

    PhysicsLoader('static/ammo', () => this.ammoStart());
  }

  ammoStart() {
    console.log('ammoStart.4');

    this.physics = new AmmoPhysics(this.scene);
    // this.physics.debug.enable(true);
    this.loop.setPhysics(this.physics);

    const ground = this.physics.add.ground({ width: this.floorSize, height: this.floorSize, depth: 10, y:-5 });
    ground.visible = false;

    new RGBELoader().load(hdrURL, (hdrmap) => this.buildScene(hdrmap));
  }

  buildScene(hdrmap) {
    console.log('buildScene.4');
    const envmaploader = new PMREMGenerator(this.renderer);
    const envmap = envmaploader.fromCubemap(hdrmap);

    this.floor = createFloor(this.scene, this.floorSize, this.floorSize, envmap);
    
    const nItems = 20;
    const spreadWidth = 10;
    const hue = Math.random();
    // const hue = 0.6;

    for (let i = 0; i < nItems; i++) {
      const hcp = {x: Math.random() * spreadWidth - spreadWidth/2, y:3, z:Math.random() * spreadWidth - spreadWidth/2};
      const hc = hingeComposition(hcp, hue, this.scene, this.loop, this.physics, envmap);
    }

    // const cItems = 100;
    // const materialCPhysical = plasticColor(0x000000, envmap);
    // for (let i = 0; i < cItems; i++) {
    //   const sphereItem = sphere(materialCPhysical, 0.02);
    //   sphereItem.position.x = Math.random() * spreadWidth - spreadWidth/2;
    //   sphereItem.position.y = Math.random() + 2;
    //   sphereItem.position.z = Math.random() * spreadWidth - spreadWidth/2;
    //   this.scene.add(sphereItem); 
    //   this.physics.add.existing(sphereItem);
    // } 

    // const sphereMaterial = physicalMaterialShinyMetal(0xffffff, envmap);
    // const s = sphere(sphereMaterial, 1);
    // this.scene.add(s);
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}

export { World };