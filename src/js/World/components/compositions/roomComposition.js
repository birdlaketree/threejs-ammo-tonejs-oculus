const roomComposition = (physics, floorSize, isVisible = false) => {
  const wallSize = 5;
  const collisionFlag = 1;

  const ground = physics.add.ground({
    width: floorSize + wallSize * 2,
    height: floorSize + wallSize * 2,
    depth: wallSize,
    y: -wallSize/2
  });
  ground.visible = isVisible;

  const ceeling = physics.add.box({
    width: floorSize + wallSize * 2,
    height: wallSize,
    depth: floorSize + wallSize * 2,
    y: floorSize + wallSize/2
  });
  ceeling.visible = isVisible;
  ceeling.body.setCollisionFlags(collisionFlag);
  ceeling.body.mass = 0;

  const wallLeft = physics.add.box({
    width: wallSize,
    height: floorSize + wallSize * 2,
    depth: floorSize + wallSize * 2,
    x: -floorSize/2 - wallSize/2,
    y: floorSize/2,
    z: 0,
  });
  wallLeft.visible = isVisible;
  wallLeft.body.setCollisionFlags(collisionFlag);
  wallLeft.body.mass = 0;

  const wallRight = physics.add.box({
    width: wallSize,
    height: floorSize + wallSize * 2,
    depth: floorSize + wallSize * 2,
    x: floorSize/2 + wallSize/2,
    y: floorSize/2,
    z: 0,
  });
  wallRight.visible = isVisible;
  wallRight.body.setCollisionFlags(collisionFlag);
  wallRight.body.mass = 0;

  const wallFront = physics.add.box({
    width: floorSize + wallSize * 2,
    height: floorSize + wallSize * 2,
    depth: wallSize,
    x: 0,
    y: floorSize/2,
    z: floorSize/2 + wallSize/2,
  });
  wallFront.visible = isVisible;
  wallFront.body.setCollisionFlags(collisionFlag);
  wallFront.body.mass = 0;

  const wallBack = physics.add.box({
    width: floorSize + wallSize * 2,
    height: floorSize + wallSize * 2,
    depth: wallSize,
    x: 0,
    y: floorSize/2,
    z: -floorSize/2 - wallSize/2,
  });
  wallBack.visible = isVisible;
  wallBack.body.setCollisionFlags(collisionFlag);
  wallBack.body.mass = 0;

  const bounciness = 0.7;
  ground.body.setBounciness(bounciness);
  ceeling.body.setBounciness(bounciness);
  wallLeft.body.setBounciness(bounciness);
  wallRight.body.setBounciness(bounciness);
  wallFront.body.setBounciness(bounciness);
  wallBack.body.setBounciness(bounciness);

  return {
    ground,
    ceeling,
    wallLeft,
    wallRight,
    wallFront,
    wallBack
  };
}

export { roomComposition };