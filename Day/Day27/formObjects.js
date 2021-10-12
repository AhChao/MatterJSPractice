function createBall(side)
{
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
    var ballInfo = getBallInfo(1);
    var ball = Bodies.circle(x, y, ballInfo.size, options = { render : {fillStyle: ballInfo.color}}, 80);
    Composite.add(engine.world, [ball]);
}

function getBallInfo(level)
{
    const ballColor = ["#D8F3DC","#B7E4C7","#95D5B2","#74C69D","#52B788","#40916C","#2D6A4F","#1B4332","#1B4332","#081C15"];
    var ballSzie = Math.sqrt(4*level)* 10;
    return {
        color : ballColor[level-1],
        size : ballSzie
    }
}