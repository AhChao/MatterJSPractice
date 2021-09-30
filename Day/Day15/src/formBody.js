function formMainBall()
{
    const mainBallInitX = canvasWidth/2;
    const mainBallInitY = 50;
    
    mainBall = Bodies.circle(mainBallInitX, mainBallInitY, mainBallRadius, options = {
        restitution: 1,
        render:{
            fillStyle:"#FFFFFF"
        }
    }, 100);
    mainBall.label = "MainBall";
    Composite.add(engine.world, [mainBall]);
}
function formHiddenWall()
{
    var wallLeft = Bodies.rectangle(-21, (canvasHeigh+triggerPlacedAddY)/2, 40, canvasHeigh+triggerPlacedAddY, { isStatic: true });
    var wallRight = Bodies.rectangle(canvasWidth+21, (canvasHeigh+triggerPlacedAddY)/2, 40, canvasHeigh+triggerPlacedAddY, { isStatic: true });
    Composite.add(engine.world, [wallLeft,wallRight]);
}

function formRandomBlocks(blockCount)
{
    var rainbowBlockCount = Math.floor(blockCount/12) + Math.floor(Math.random()*2) - Math.floor(Math.random()*2);
    var goldBlockCount = Math.floor(blockCount/10) + Math.floor(Math.random()*2) - Math.floor(Math.random()*2);
    var normalBlockCount = blockCount - rainbowBlockCount - goldBlockCount;

    if(rainbowBlockCount < 0) rainbowBlockCount = 0;
    if(goldBlockCount < 5) goldBlockCount = 5;
    
    var normalBlockOptions ={
        render : {
            fillStyle : "#569cd8",
        },
        isStatic : true,
        angle : getRadiusByDegree(45)
    };
    var goldBlockOptions ={
        render : {
            fillStyle : "#FFD700",
        },
        isStatic : true,
        angle : getRadiusByDegree(45)
    };
    var rainbowBlockOptions ={
        render : {
            fillStyle : "red",
        },
        isStatic : true,
        angle : getRadiusByDegree(45)
    };
    
    var blockCoordinateList = [];
    blockList = [];
    formBlockWithOptionAndCount(normalBlockCount,normalBlockOptions,blockCoordinateList,"NormalBlock");
    formBlockWithOptionAndCount(goldBlockCount,goldBlockOptions,blockCoordinateList,"GoldBlock");
    formBlockWithOptionAndCount(rainbowBlockCount,rainbowBlockOptions,blockCoordinateList,"RainbowBlock");
}

function formBlockWithOptionAndCount(blockCount,blockOptions,blockCoordinateList,labelName)
{
    for(var i=0; i<blockCount; i++)
    {
        var blockCoordinate = getRandomCoordinateForBlocks(blockCoordinateList);
        var block = Bodies.rectangle(blockCoordinate.x, blockCoordinate.y, blockSize, blockSize, blockOptions);
        blockCoordinateList.push(blockCoordinate);
        blockList.push(block);
        block.label = labelName;                
        Composite.add(engine.world, [block]);
    }
}

function formEndingTrigger()
{
    var wallBottom = Bodies.rectangle(canvasWidth/2, canvasHeigh+triggerPlacedAddY, canvasWidth, 100, { isSensor:true, isStatic:true, label:"EndingBlock", render:{
        fillStyle : "transparent"
    }});
    Composite.add(engine.world, [wallBottom]);
}