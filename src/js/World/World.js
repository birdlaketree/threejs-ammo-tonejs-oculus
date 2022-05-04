import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Loop } from './system/Loop.js';
import { createRenderer } from './system/renderer.js';
import { createScene } from './components/scene.js';
import { createCamera, createDolly } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createFloor } from './components/meshes/floor.js';
import { VrControls } from './system/VrControls.js';
import { sphere } from './components/meshes/sphere.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { AmmoPhysics, PhysicsLoader } from '@enable3d/ammo-physics';
import { PMREMGenerator } from 'three';
import { plasticColor } from './components/materials/physicalMaterial.js';
import { ballComposition } from './components/compositions/ballComposition.js';

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
    console.log('ammoStart.5');

    this.physics = new AmmoPhysics(this.scene);
    // this.physics.debug.enable(true);
    this.loop.setPhysics(this.physics);

    const ground = this.physics.add.ground({ width: this.floorSize, height: this.floorSize, depth: 10, y:-5 });
    ground.visible = false;

    ground.body.checkCollisions = true;
    ground.body.on.collision((otherObject, event) => {
      if (event === 'start') {
        // console.log('collision', otherObject);
        // console.log('collision:p', otherObject.position);
        // console.log('collision:v', otherObject.body.velocity);
        // console.log('collision:a', otherObject.body.angularVelocity);
        // console.log('collision:mass', otherObject.body.getMass);

        // this.collisionMarker.position.x = otherObject.position.x;
        // this.collisionMarker.position.y = otherObject.position.y;
        // this.collisionMarker.position.z = otherObject.position.z;
        // otherObject.body.applyForce
      }
    })

    new RGBELoader().load(hdrURL, (hdrmap) => this.buildScene(hdrmap));
  }

  buildScene(hdrmap) {
    console.log('buildScene.5');
    const envmaploader = new PMREMGenerator(this.renderer);
    const envmap = envmaploader.fromCubemap(hdrmap);

    this.floor = createFloor(this.scene, this.floorSize, this.floorSize, envmap);

    // const markerMaterial = plasticColor(0xff0000, envmap);
    // this.collisionMarker = sphere(markerMaterial, 0.15);
    // this.scene.add(this.collisionMarker);

    const bc = ballComposition(this.scene, this.physics, this.loop, envmap);
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}

export { World };