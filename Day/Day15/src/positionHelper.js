function getRandomCoordinateForBlocks(blockCoordinateList)
{
    var x = minimumBlockGenerateX + blockSeparateX * Math.random();
    var y = minimumBlockGenerateY + blockSeparateY * Math.random();
    var fitAll = false;
    var loopCount = 0;
    while(!fitAll && loopCount < 1000)
    {
        fitAll = true;
        for(var i in blockCoordinateList)
        {
            if(getDistanceWithPoints(blockCoordinateList[i],{x,y}) < minimumDistanceBetweenBlocks)
            {
                x = minimumBlockGenerateX + blockSeparateX * Math.random();
                y = minimumBlockGenerateY + blockSeparateY * Math.random();
                fitAll = false;
            }
        }
        loopCount++;
    }
    return {x,y};
}

function checkClosedToAnyColorBlock(blockList,mainBall)
{
    for(var i in blockList)
    {
        if(blockList[i])
        {
            var label = blockList[i].label;
            if(label == "GoldBlock" || label == "RainbowBlock")
            {
                if(getDistanceWithPoints({x:blockList[i].position .x, y:blockList[i].position .y},{x:mainBall.position .x,y:mainBall.position .y}) < zoomInDistance)
                {
                    triggerZoomIn();
                    isZoomIn = true;
                    return;
                }
            }
        }
    }
    isZoomIn = false;
    triggerZoomOut();
}

function getDistanceWithPoints(pointA,pointB)
{
    return Math.sqrt(Math.pow(Math.floor(pointA.x) - Math.floor(pointB.x),2) + Math.pow(Math.floor(pointA.y) - Math.floor(pointB.y),2));
}

function getRadiusByDegree(degree)
{
    return Math.PI / 180 * degree;
}