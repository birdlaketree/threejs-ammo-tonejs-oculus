import {Math, PlaneGeometry, MeshStandardMaterial, Mesh, DoubleSide, Vector2 } from 'three';
import { textureHandler } from '../../system/textureHandler';

const mapUrl             = new URL('/assets/textures/Concrete_Dirty_ue4idgdlw_4K_surface_ms/ue4idgdlw_4K_Albedo.jpg', import.meta.url);
// const aoMapUrl           = new URL('/assets/textures/Concrete_Dirty_ue4idgdlw_4K_surface_ms/ue4idgdlw_4K_AO.jpg', import.meta.url);
// const displacementMapUrl = new URL('/assets/textures/Concrete_Dirty_ue4idgdlw_4K_surface_ms/ue4idgdlw_4K_Displacement.jpg', import.meta.url);
// const normalMapUrl       = new URL('/assets/textures/Concrete_Dirty_ue4idgdlw_4K_surface_ms/ue4idgdlw_4K_Normal.jpg', import.meta.url);
// const roughnessMapUrl    = new URL('/assets/textures/Concrete_Dirty_ue4idgdlw_4K_surface_ms/ue4idgdlw_4K_Roughness.jpg', import.meta.url);

// const mapUrl             = new URL('/assets/textures/noise-roughness.png', import.meta.url);
const aoMapUrl           = new URL('/assets/textures/noise-ao.png', import.meta.url);
const displacementMapUrl = new URL('/assets/textures/noise-roughness.png', import.meta.url);
const normalMapUrl       = new URL('/assets/textures/noise-normal.png', import.meta.url);
const roughnessMapUrl    = new URL('/assets/textures/noise-roughness.png', import.meta.url);

const createFloor = (scene, width = 20, height = 20, envmap) => {
  const geometry = new PlaneGeometry(width, height, 64, 64);

  const repeat = 8;
  const mapTexture = textureHandler(mapUrl, repeat);
  const aoTexture = textureHandler(aoMapUrl, repeat);
  const displacementTexture = textureHandler(displacementMapUrl, repeat);
  const normalTexture = textureHandler(normalMapUrl, repeat);
  const roughnessTexture = textureHandler(roughnessMapUrl, repeat);

  const displacement = 0.02;
  const parameters = {
    envMap: envmap.texture,
    envMapIntensity: 1,
    color: 0xfffdeb,
    // side: DoubleSide,
    // emissive: 0x222222,
    // roughness: 0.8,
    metalness: 0,
    // map: mapTexture,
    aoMap: aoTexture,
    displacementMap: displacementTexture,
    displacementScale: 1 * displacement,
    displacementBias: -0.5 * displacement,
    normalMap: normalTexture,
    normalScale: new Vector2(0.3, 0.3),
    // normalScale: new Vector2(2.2, 2.2),
    roughnessMap: roughnessTexture
  }
  const material = new MeshStandardMaterial(parameters);
  geometry.attributes.uv2 = geometry.attributes.uv; // second uv is needed for aoMap
  const mesh = new Mesh( geometry, material );
  mesh.receiveShadow = true;
  mesh.rotation.x = Math.degToRad(270);
  scene.add(mesh)
  return mesh;
}

export { createFloor };