function createBall(side,level)
{
    if(level == null) level = 1;
    var x;
    var y;
    var offset = 20;
    switch(side)
    {
        case "top":
            x = canvasWidth / 2;
            y = wallThickness + offset;
            break;
        case "left":
            x = wallThickness + offset;
            y = canvasHeight / 2;
            break;
        case "right":
            x = canvasWidth - wallThickness - offset;
            y = canvasHeight / 2;
            break;
        case "down":
            x = canvasWidth / 2;
            y = canvasHeight - wallThickness - offset;
            break;
    }
    var ballInfo = getBallInfo(level);
    var ball = Bodies.circle(x, y, ballInfo.size, options = { label: level, render : {fillStyle: ballInfo.color}, isSleeping : true}, 80);
    Composite.add(engine.world, [ball]);
}

function getBallInfo(level)
{
    level = parseInt(level);
    const ballColor = ["#D8F3DC","#B7E4C7","#95D5B2","#74C69D","#52B788","#40916C","#2D6A4F","#1B4332","#1B4332","#081C15"];
    var ballSzie = Math.sqrt(2*level)* 10;
    return {
        color : ballColor[level-1],
        size : ballSzie
    }
}

function generateBallAfterSwiped(side)
{
    switch(side)
    {
        case "top":
            createBall("down");
            return;
        case "down":
            createBall("top");
            return;
        case "left":
            createBall("right");
            return;
        case "right":
            createBall("left");
            return;
    }
}

function ballCollision(collisionLevel, bodyAId, bodyBId)
{
    var newLevel = parseInt(collisionLevel) + 1;
    var newBallInfo = getBallInfo(newLevel);
    var bodyA = engine.world.bodies.filter(x=>x.id == bodyAId)[0];
    var bodyB = engine.world.bodies.filter(x=>x.id == bodyBId)[0];
    var newPosition = getMiddlePlace(bodyA.position, bodyB.position);
    var ball = Bodies.circle(newPosition.x, newPosition.y, newBallInfo.size, options = { label: newLevel, render : {fillStyle: newBallInfo.color}}, 80);
    Composite.add(engine.world, [ball]);
    Composite.remove(engine.world, [bodyA,bodyB]);
}