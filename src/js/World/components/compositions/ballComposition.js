import { sphere } from "../meshes/sphere";
import { plasticColor } from "../materials/physicalMaterial";

const ballComposition = (scene, physics, loop, envmap) => {
  const cItems = 10;
  const spreadWidth = 10;
  const sphereMaterial = plasticColor(0xffffff, envmap);

  for (let i = 0; i < cItems; i++) {
    const sphereItem = sphere(sphereMaterial, Math.random()/10 + 0.02);
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