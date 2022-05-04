const room = (physics, floorSize, isVisible = false) => {
  const wallSize = 5;
  const collisionFlag = 2;

  const ground = physics.add.ground({
    width: floorSize + wallSize * 2,
    height: floorSize + wallSize * 2,
    depth: wallSize,
    y: -wallSize/2
  });
  ground.visible = isVisible;

  const ceeling = physics.add.ground({
    width: floorSize + wallSize * 2,
    height: floorSize + wallSize * 2,
    depth: wallSize,
    y: floorSize + wallSize/2
  });
  ceeling.visible = isVisible;
  ceeling.body.setCollisionFlags(collisionFlag);

  const wallLeft = physics.add.ground({
    width: wallSize,
    depth: floorSize + wallSize * 2,
    height: floorSize + wallSize * 2,
    x: -floorSize/2 - wallSize/2,
    y: floorSize/2,
    z: 0,
  });
  wallLeft.visible = isVisible;
  wallLeft.body.setCollisionFlags(collisionFlag);

  const wallRight = physics.add.ground({
    width: wallSize,
    depth: floorSize + wallSize * 2,
    height: floorSize + wallSize * 2,
    x: floorSize/2 + wallSize/2,
    y: floorSize/2,
    z: 0,
  });
  wallRight.visible = isVisible;
  wallRight.body.setCollisionFlags(collisionFlag);

  const wallFront = physics.add.ground({
    width: floorSize + wallSize * 2,
    depth: floorSize + wallSize * 2,
    height: wallSize,
    x: 0,
    y: floorSize/2,
    z: floorSize/2 + wallSize/2,
  });
  wallFront.visible = isVisible;
  wallFront.body.setCollisionFlags(collisionFlag);

  const wallBack = physics.add.ground({
    width: floorSize + wallSize * 2,
    depth: floorSize + wallSize * 2,
    height: wallSize,
    x: 0,
    y: floorSize/2,
    z: -floorSize/2 - wallSize/2,
  });
  wallBack.visible = isVisible;
  wallBack.body.setCollisionFlags(collisionFlag);

  return ground;
}

export { room };