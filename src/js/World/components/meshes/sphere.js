import { SphereGeometry, Mesh } from 'three';

const sphere = (material, radius) => {
  const geometry = new SphereGeometry(radius, 64, 64);
  const mesh = new Mesh( geometry, material );

  mesh.tick = (delta) => {
    if (mesh.body) {
      const forceRange = 10;
      const force = {
        x: Math.random() * forceRange - forceRange/2,
        y: Math.random() * forceRange - forceRange/2,
        z: Math.random() * forceRange - forceRange/2
      }
      const treshold = Math.random();

      if (treshold < 0.01) {
        mesh.body.applyForce(force.x, force.y, force.z);
        mesh.body.needUpdate = true;
      }
    }
    
  };

  return mesh;
}

export { sphere };