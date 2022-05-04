import { Color, PositionalAudio } from "three";
import { PositionalAudioHelper } from "three/examples/jsm/helpers/PositionalAudioHelper";
import { sphere } from "../meshes/sphere";
import { plasticColor } from "../materials/physicalMaterial";
import { Tone } from "tone/build/esm/core/Tone";
import { Oscillator } from "tone";

const ballComposition = (scene, physics, loop, listener, envmap) => {
  const cItems = 40;
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
    const sphereItem = sphere(sphereMaterial, Math.random()/6 + 0.04);

    sphereItem.position.x = Math.random() * spreadWidth - spreadWidth/2;
    sphereItem.position.y = Math.random() + 2;
    sphereItem.position.z = Math.random() * spreadWidth - spreadWidth/2;
    sphereItem.castShadow = true;

    scene.add(sphereItem); 
    physics.add.existing(sphereItem);
    loop.updatables.push(sphereItem);

    // 

    // const positionalAudio = new PositionalAudio(listener);
    // const oscillator = listener.context.createOscillator();
    // oscillator.type = 'sine';
    // oscillator.frequency.setValueAtTime( Math.random()*500, positionalAudio.context.currentTime );
    // oscillator.start(0);
    // positionalAudio.setNodeSource( oscillator );
    // positionalAudio.setRefDistance(20);
    // positionalAudio.setVolume(0.01);
    // sphereItem.add(positionalAudio);

    // const positionalAudio = new PositionalAudio(listener);
    // Tone.context = positionalAudio.context;
    // const osc = new Oscillator(440, "sine");
    // positionalAudio.setNodeSource(osc);
    // sphereItem.add(positionalAudio);

    // 

    sphereItem.body.checkCollisions = true;
    sphereItem.body.on.collision((otherObject, event) => {
      // console.log(event);
      // console.log(sphereItem.position);

      if (event === 'start') {
        // console.log('start');
      }

      if (event === 'collision') {
      }

      if (event === 'end') {
        // console.log('end');
      }

      // if (event === 'start') {
      //   console.log('collision', otherObject);
      //   console.log('collision:p', otherObject.position);
      //   console.log('collision:v', otherObject.body.velocity);
      //   console.log('collision:a', otherObject.body.angularVelocity);
      //   console.log('collision:mass', otherObject.body.getMass);

      //   this.collisionMarker.position.x = otherObject.position.x;
      //   this.collisionMarker.position.y = otherObject.position.y;
      //   this.collisionMarker.position.z = otherObject.position.z;
      // }
    })
  } 
}

export { ballComposition };