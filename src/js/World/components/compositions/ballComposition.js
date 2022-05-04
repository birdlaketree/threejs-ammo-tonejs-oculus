import { Color } from "three";
import { sphere } from "../meshes/sphere";
import { plasticColor } from "../materials/physicalMaterial";

const ballComposition = (scene, physics, loop, envmap) => {
  const cItems = 12;
  const spreadWidth = 10;

  // const hue = Math.random();
  const hue = 0.8;

  for (let i = 0; i < cItems; i++) {
    const hueShift = hue + Math.random() * 0.2 - 0.1;
    const s1 = 0.96;
    const l1 = 0.40 + Math.random() * 0.2 - 0.1;
    const color = new Color();
    color.setHSL(hueShift, s1, l1);

    const sphereMaterial = plasticColor(color, envmap);
    const sphereItem = sphere(sphereMaterial, Math.random()/6 + 0.02);

    sphereItem.position.x = Math.random() * spreadWidth - spreadWidth/2;
    sphereItem.position.y = Math.random() + 2;
    sphereItem.position.z = Math.random() * spreadWidth - spreadWidth/2;
    sphereItem.castShadow = true;

    scene.add(sphereItem); 
    physics.add.existing(sphereItem);
    loop.updatables.push(sphereItem);
  } 
}

export { ballComposition };