import { PerspectiveCamera, Group, Math } from 'three';

const createCamera = () => {
  const camera = new PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 200 );
  camera.position.x = 20;
  camera.position.z = 30;
  camera.position.y = 20;
  return camera;
}

const createDolly = (camera, scene) => {
  const dolly = new Group();
  dolly.name = "dolly";
  scene.add(dolly);
  dolly.add(camera);
  return dolly;
}

export { createCamera, createDolly };