import { AmbientLight, DirectionalLight, PointLight } from 'three';
import { sphere } from './meshes/sphere';
import { colorStandardMaterial } from './materials/standardMaterial.js';

const createLights = scene => {
  const pointMaterial = colorStandardMaterial(0x222222);
  const directionMaterial = colorStandardMaterial(0x3333ff);

  // const light_ambient = new AmbientLight(0xffffff, 0.2)
  // scene.add(light_ambient)

  const point1 = new PointLight(0xffffff, 8);
  point1.position.set(0, 9, 0);
  point1.castShadow = true;
  point1.shadow.mapSize.width = 4096;
  point1.shadow.mapSize.height = 4096;
  scene.add(point1);
  const point1marker = sphere(pointMaterial, 0.1);
  point1.add(point1marker);

  // const point2 = new PointLight(0xffffff, 1);
  // point2.position.set(-5, 3, -5);
  // scene.add(point2);
  // const point2marker = sphere(pointMaterial, 0.1);
  // point2.add(point2marker);

  // const point3 = new PointLight(0xffffff, 1);
  // point3.position.set(5, 3, 5);
  // scene.add(point3);
  // const point3marker = sphere(pointMaterial, 0.1);
  // point3.add(point3marker);

  // const directional = new DirectionalLight(0xdddddd, 1);
  // directional.position.set(0, 20, -10);
  // scene.add(directional);
  // const directional1marker = sphere(directionMaterial, 0.2);
  // directional.add(directional1marker);
}

export { createLights };